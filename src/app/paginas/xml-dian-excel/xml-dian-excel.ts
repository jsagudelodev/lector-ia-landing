import { ChangeDetectionStrategy, Component, computed, inject, isDevMode, signal } from '@angular/core';
import { Metadatos } from '../../compartido/metadatos';
import { SITIO, enlacePrueba } from '../../configuracion/sitio';
import { Cierre } from '../../secciones/cierre/cierre';

/** Lo que dice la API además del Excel: cuántas se leyeron y cuántos archivos no. */
interface IResultado {
  readonly leidas: number;
  readonly conError: number;
}

/** Tope por envío. Es el mismo del backend (`MAX_ARCHIVOS`): avisar aquí ahorra un viaje que fallaría. */
const MAX_ARCHIVOS = 50;
const EXTENSIONES = ['.xml', '.zip'];

/**
 * Herramienta gratis «XML DIAN → Excel» (BL-127): la primera puerta del embudo. No usa IA, así que no
 * cuesta nada y no pide cuenta. Lleva al producto con el puente del final: quien tiene el PDF o la foto,
 * y no el XML, necesita el lector.
 */
@Component({
  selector: 'app-xml-dian-excel',
  imports: [Cierre],
  templateUrl: './xml-dian-excel.html',
  styleUrl: './xml-dian-excel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class XmlDianExcel {
  private readonly metadatos = inject(Metadatos);

  protected readonly enlacePrueba = enlacePrueba();
  protected readonly maxArchivos = MAX_ARCHIVOS;
  protected readonly archivos = signal<readonly File[]>([]);
  protected readonly arrastrando = signal(false);
  protected readonly enviando = signal(false);
  protected readonly resultado = signal<IResultado | null>(null);
  protected readonly error = signal<string | null>(null);
  protected readonly descartados = signal(0);

  protected readonly puedeConvertir = computed(() => this.archivos().length > 0 && !this.enviando());

  constructor() {
    this.metadatos.aplicar({
      ruta: '/xml-dian-a-excel',
      titulo: 'Facturas electrónicas XML a Excel, gratis · Lector PDF IA',
      descripcion:
        'Convierte los XML de tus facturas electrónicas DIAN en un Excel con todas: una hoja de facturas y otra de productos. Gratis, sin registrarte y sin guardar tus archivos.',
    });
  }

  protected alElegir(evento: Event): void {
    const entrada = evento.target as HTMLInputElement;
    this.agregar(Array.from(entrada.files ?? []));
    entrada.value = ''; // permite volver a elegir los mismos archivos
  }

  protected alArrastrar(evento: DragEvent, encima: boolean): void {
    evento.preventDefault();
    this.arrastrando.set(encima);
  }

  protected alSoltar(evento: DragEvent): void {
    evento.preventDefault();
    this.arrastrando.set(false);
    this.agregar(Array.from(evento.dataTransfer?.files ?? []));
  }

  protected quitar(indice: number): void {
    this.archivos.update((lista) => lista.filter((_, i) => i !== indice));
  }

  protected limpiar(): void {
    this.archivos.set([]);
    this.resultado.set(null);
    this.error.set(null);
    this.descartados.set(0);
  }

  protected async convertir(): Promise<void> {
    if (!this.puedeConvertir()) {
      return;
    }
    this.enviando.set(true);
    this.error.set(null);
    this.resultado.set(null);

    const formulario = new FormData();
    for (const archivo of this.archivos()) {
      formulario.append('files', archivo, archivo.name);
    }
    const base = isDevMode() ? SITIO.urlApiLocal : SITIO.urlApi;

    try {
      const respuesta = await fetch(`${base}/api/v1/tools/dian-xml-to-excel`, { method: 'POST', body: formulario });
      if (!respuesta.ok) {
        this.error.set(await this.mensajeDeError(respuesta));
        return;
      }
      this.descargar(await respuesta.blob());
      this.resultado.set({
        leidas: Number(respuesta.headers.get('X-Facturas-Leidas') ?? 0),
        conError: Number(respuesta.headers.get('X-Archivos-Con-Error') ?? 0),
      });
    } catch {
      this.error.set('No pudimos conectarnos con el servicio. Revisa tu conexión e inténtalo de nuevo.');
    } finally {
      this.enviando.set(false);
    }
  }

  private agregar(nuevos: File[]): void {
    const validos = nuevos.filter((archivo) => EXTENSIONES.some((ext) => archivo.name.toLowerCase().endsWith(ext)));
    this.descartados.set(nuevos.length - validos.length);
    this.resultado.set(null);
    this.error.set(null);
    this.archivos.update((lista) => [...lista, ...validos].slice(0, MAX_ARCHIVOS));
    if (this.archivos().length === MAX_ARCHIVOS && validos.length > 0) {
      this.error.set(`Puedes convertir hasta ${MAX_ARCHIVOS} facturas a la vez.`);
    }
  }

  private async mensajeDeError(respuesta: Response): Promise<string> {
    if (respuesta.status === 429) {
      return 'Hiciste muchas conversiones seguidas. Espera un minuto y vuelve a intentarlo.';
    }
    try {
      const cuerpo = (await respuesta.json()) as { detail?: string };
      return cuerpo.detail ?? 'No pudimos convertir los archivos.';
    } catch {
      return 'No pudimos convertir los archivos.';
    }
  }

  private descargar(contenido: Blob): void {
    const url = URL.createObjectURL(contenido);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = 'facturas-dian.xlsx';
    enlace.click();
    URL.revokeObjectURL(url);
  }
}
