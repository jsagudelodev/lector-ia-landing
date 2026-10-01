import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { SIN_CONEXION, descargarArchivo, mensajeDeError, urlHerramienta } from '../../compartido/api-herramientas';
import { Metadatos } from '../../compartido/metadatos';
import { enlacePrueba } from '../../configuracion/sitio';
import { Cierre } from '../../secciones/cierre/cierre';

interface IParte {
  readonly nombre?: string | null;
  readonly nit?: string | null;
  readonly ciudad?: string | null;
  readonly correo?: string | null;
}

interface IItem {
  readonly codigo?: string | null;
  readonly descripcion?: string | null;
  readonly cantidad?: number | null;
  readonly unidad?: string | null;
  readonly valor_unitario?: number | null;
  readonly valor_total?: number | null;
}

/** Lo que devuelve el lector de XML de la DIAN: los campos de la plantilla `factura_electronica_dian`. */
interface IFactura {
  readonly numero_factura?: string | null;
  readonly cufe?: string | null;
  readonly fecha_emision?: string | null;
  readonly fecha_vencimiento?: string | null;
  readonly moneda?: string | null;
  readonly emisor?: IParte | null;
  readonly adquiriente?: IParte | null;
  readonly items?: readonly IItem[] | null;
  readonly [campo: string]: unknown;
}

interface IAviso {
  readonly code: string;
  readonly field?: string | null;
  readonly message: string;
}

interface IRevision {
  readonly archivo: string;
  readonly factura: IFactura;
  readonly cuadra: boolean;
  readonly avisos: readonly IAviso[];
  readonly revisado: readonly string[];
}

/** Los totales que se muestran, en orden, con su nombre legible. Los vacíos no aparecen. */
const TOTALES: readonly (readonly [string, string])[] = [
  ['subtotal', 'Subtotal'],
  ['descuentos', 'Descuentos'],
  ['iva', 'IVA'],
  ['impuesto_consumo', 'Impuesto al consumo'],
  ['retencion_fuente', 'Retención en la fuente'],
  ['retencion_iva', 'Retención de IVA'],
  ['retencion_ica', 'Retención de ICA'],
];

/**
 * Herramienta gratis «Revisa tu factura electrónica» (BL-137): el XML, legible y revisado. Usa las mismas
 * validaciones de cada extracción, así que muestra en pequeño lo que el producto hace con todo.
 */
@Component({
  selector: 'app-revisar-factura',
  imports: [Cierre],
  templateUrl: './revisar-factura.html',
  styleUrl: './revisar-factura.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisarFactura {
  private readonly metadatos = inject(Metadatos);
  private readonly dinero = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 2 });

  protected readonly enlacePrueba = enlacePrueba();
  protected readonly archivo = signal<File | null>(null);
  protected readonly arrastrando = signal(false);
  protected readonly revisando = signal(false);
  protected readonly descargando = signal(false);
  protected readonly revision = signal<IRevision | null>(null);
  protected readonly error = signal<string | null>(null);

  protected readonly totales = computed(() => {
    const factura = this.revision()?.factura;
    if (!factura) {
      return [];
    }
    return TOTALES.filter(([campo]) => typeof factura[campo] === 'number' && factura[campo] !== 0).map(
      ([campo, nombre]) => ({ nombre, valor: factura[campo] as number }),
    );
  });

  constructor() {
    this.metadatos.aplicar({
      ruta: '/revisar-factura-electronica',
      titulo: 'Revisa tu factura electrónica DIAN, gratis · Lector PDF IA',
      descripcion:
        'Sube el XML de tu factura electrónica y mira si cuadra: los totales, los ítems, el dígito de verificación de los NIT y las fechas. Gratis, sin registrarte y sin guardar tus archivos.',
    });
  }

  protected numero(valor: number | null | undefined): string {
    return valor === null || valor === undefined ? '—' : this.dinero.format(valor);
  }

  protected alElegir(evento: Event): void {
    const entrada = evento.target as HTMLInputElement;
    const elegido = entrada.files?.[0];
    entrada.value = '';
    if (elegido) {
      void this.revisar(elegido);
    }
  }

  protected alArrastrar(evento: DragEvent, encima: boolean): void {
    evento.preventDefault();
    this.arrastrando.set(encima);
  }

  protected alSoltar(evento: DragEvent): void {
    evento.preventDefault();
    this.arrastrando.set(false);
    const soltado = evento.dataTransfer?.files?.[0];
    if (soltado) {
      void this.revisar(soltado);
    }
  }

  protected otra(): void {
    this.archivo.set(null);
    this.revision.set(null);
    this.error.set(null);
  }

  /** La misma factura, en el Excel de la otra herramienta: no se vuelve a pedir nada nuevo. */
  protected async descargarExcel(): Promise<void> {
    const archivo = this.archivo();
    if (!archivo || this.descargando()) {
      return;
    }
    this.descargando.set(true);
    const formulario = new FormData();
    formulario.append('files', archivo, archivo.name);
    try {
      const respuesta = await fetch(urlHerramienta('dian-xml-to-excel'), { method: 'POST', body: formulario });
      if (respuesta.ok) {
        descargarArchivo(await respuesta.blob(), 'factura-dian.xlsx');
      } else {
        this.error.set(await mensajeDeError(respuesta, 'No pudimos armar el Excel.'));
      }
    } catch {
      this.error.set(SIN_CONEXION);
    } finally {
      this.descargando.set(false);
    }
  }

  private async revisar(archivo: File): Promise<void> {
    const nombre = archivo.name.toLowerCase();
    if (!nombre.endsWith('.xml') && !nombre.endsWith('.zip')) {
      this.error.set('Aquí solo se revisan facturas electrónicas: sube el XML, o el ZIP en que te llegó.');
      return;
    }
    this.archivo.set(archivo);
    this.revision.set(null);
    this.error.set(null);
    this.revisando.set(true);
    const formulario = new FormData();
    formulario.append('file', archivo, archivo.name);
    try {
      const respuesta = await fetch(urlHerramienta('dian-xml-review'), { method: 'POST', body: formulario });
      if (!respuesta.ok) {
        this.error.set(await mensajeDeError(respuesta, 'No pudimos revisar la factura.'));
        return;
      }
      this.revision.set((await respuesta.json()) as IRevision);
    } catch {
      this.error.set(SIN_CONEXION);
    } finally {
      this.revisando.set(false);
    }
  }
}
