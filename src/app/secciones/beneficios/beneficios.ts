import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Revelar } from '../../compartido/revelar';

interface IBeneficio {
  readonly icono: string;
  readonly titulo: string;
  readonly texto: string;
}

/** Cada beneficio es algo que el servicio hace hoy (ver docs/FUNCIONALIDADES.md del backend). */
@Component({
  selector: 'app-beneficios',
  imports: [Revelar],
  templateUrl: './beneficios.html',
  styleUrl: './beneficios.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Beneficios {
  protected readonly beneficios: readonly IBeneficio[] = [
    {
      icono: '👁',
      titulo: 'Lee como una persona',
      texto: 'Ve el documento completo: texto, tablas, sellos y la disposición de la página. Acepta PDF, fotos de celular y escaneos.',
    },
    {
      icono: '📍',
      titulo: 'Cada dato dice de dónde salió',
      texto: 'La página y el texto exacto donde aparece, comprobado contra el documento. En el panel se resalta sobre el PDF.',
    },
    {
      icono: '🧮',
      titulo: 'Te avisa cuando algo no cuadra',
      texto: 'Revisa que el subtotal más impuestos dé el total, que las líneas sumen, el dígito de verificación del NIT y las fechas.',
    },
    {
      icono: '⚡',
      titulo: 'La factura electrónica, exacta',
      texto: 'Si tienes el XML de la DIAN, se lee sin IA: exacto, en milisegundos y sin descontar páginas de tu plan.',
    },
    {
      icono: '🧩',
      titulo: 'Con tu estructura, no la nuestra',
      texto: 'Pega el JSON que esperas recibir y el servicio lo llena. O parte de una de las 22 plantillas listas y adáptala.',
    },
    {
      icono: '✅',
      titulo: 'Sabes cuándo revisar',
      texto: 'Cada resultado dice si conviene que lo mire una persona y por qué. Así solo revisas lo que hace falta.',
    },
  ];
}
