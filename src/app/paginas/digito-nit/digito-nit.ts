import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Metadatos } from '../../compartido/metadatos';
import { MAX_DIGITOS, ResultadoNit, calcular, dvEscrito } from '../../compartido/nit';
import { Cierre } from '../../secciones/cierre/cierre';

const MOTIVOS: Record<Exclude<ResultadoNit, { ok: true }>['motivo'], string> = {
  vacio: 'Escribe el NIT para calcular su dígito.',
  'sin-digitos': 'No encontramos números en lo que escribiste.',
  'muy-largo': `Un NIT tiene como máximo ${MAX_DIGITOS} dígitos sin contar el de verificación.`,
};

/**
 * «Calcular el dígito de verificación del NIT» (BL-135): herramienta gratis de la landing.
 *
 * **Todo ocurre en el navegador.** El cálculo está portado del backend y no se manda nada a ningún
 * servidor: un NIT es el dato de una empresa, y no hay razón para que viaje por la red solo para
 * multiplicar quince números. Eso se dice en la página, porque es lo que diferencia esta herramienta
 * de las otras que hay por ahí.
 *
 * El puente con el producto no es un anuncio: quien llega aquí tiene el NIT **en una factura**, y lo
 * está transcribiendo a mano. Esa es la conversación.
 */
@Component({
  selector: 'app-digito-nit',
  imports: [Cierre],
  templateUrl: './digito-nit.html',
  styleUrl: './digito-nit.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DigitoNit {
  private readonly metadatos = inject(Metadatos);

  protected readonly entrada = signal('');
  /** Si lo pegado ya trae el dígito al final, como viene impreso en la factura. */
  protected readonly incluyeDv = signal(true);
  protected readonly copiado = signal(false);

  protected readonly resultado = computed(() => calcular(this.entrada(), this.incluyeDv()));

  /** El dígito que traía lo pegado, para poder decir si coincide con el calculado. */
  protected readonly escrito = computed(() => dvEscrito(this.entrada(), this.incluyeDv()));

  /** `true` coincide, `false` no, `null` no hay con qué comparar. */
  protected readonly coincide = computed(() => {
    const resultado = this.resultado();
    const escrito = this.escrito();
    return resultado.ok && escrito !== null ? resultado.dv === escrito : null;
  });

  protected readonly error = computed(() => {
    const resultado = this.resultado();
    return resultado.ok || !this.entrada().trim() ? '' : MOTIVOS[resultado.motivo];
  });

  constructor() {
    this.metadatos.aplicar({
      ruta: '/digito-de-verificacion-nit',
      titulo: 'Calcular el dígito de verificación del NIT, gratis · Lector PDF IA',
      descripcion:
        'Escribe el NIT y calculamos su dígito de verificación con el módulo 11 de la DIAN. Se hace en tu navegador: el número no sale de tu computador.',
    });
  }

  protected alEscribir(evento: Event): void {
    this.entrada.set((evento.target as HTMLInputElement).value);
    this.copiado.set(false);
  }

  protected alCambiarModo(evento: Event): void {
    this.incluyeDv.set((evento.target as HTMLInputElement).checked);
    this.copiado.set(false);
  }

  protected async copiar(texto: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(texto);
      this.copiado.set(true);
    } catch {
      this.copiado.set(false); // sin permiso de portapapeles: queda el número a la vista para copiarlo a mano
    }
  }
}
