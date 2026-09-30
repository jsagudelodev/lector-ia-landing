import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Revelar } from '../../compartido/revelar';
import { enlacePrueba } from '../../configuracion/sitio';

interface IPlan {
  readonly nombre: string;
  readonly precio: string;
  /** Lo que va debajo del precio: el equivalente en pesos y el costo de la página de más. */
  readonly nota?: string;
  readonly descripcion: string;
  readonly incluye: readonly string[];
  readonly accion: string;
  readonly destacado: boolean;
}

/**
 * **En pesos, para Colombia** (2026-09-30): el cliente de arranque es la pyme y el contador colombianos,
 * que pagan por PSE, Nequi o transferencia, y un precio en dólares se siente extranjero. Equivalen a los
 * USD 10 y 30 de antes a COP 4.000 por dólar. **Los costos siguen en dólares** (Gemini, Google Cloud): si
 * el peso se devalúa, el margen se achica, así que conviene revisarlos cada trimestre.
 *
 * Los montos salen del costo medido y del trabajo que reemplazan, no de lo que cobra la competencia: un
 * OCR por página es un componente, no un producto. El costo va de USD 0,0012 a 0,0123 por página según
 * cuántas líneas trae el documento; con el más denso, el margen baja a 2× (ver BL-124 en el backend).
 *
 * **Están publicados a propósito.** Antes decían «a consultar», y eso no aplaza la decisión: la toma
 * el visitante, que asume que es caro y se va sin escribir. Un precio que se queda corto se corrige
 * en una semana; a quien se fue no se le vuelve a ver.
 *
 * PENDIENTE: confirmar con el contador si el servicio lleva IVA, y decirlo junto al precio.
 *
 * **Las cuotas de aquí existen de verdad en el backend y no pueden separarse.** Viven en
 * `lector-ia-backend`, en `backend/app/core/config.py`: `TRIAL_MONTHLY_QUOTA_PAGES` (10, el Gratis),
 * `TRIAL_DAYS` (0: no vence), `TRIAL_API_ACCESS` (sin API) y `DEFAULT_MONTHLY_QUOTA_PAGES` (250, el
 * Personal). Las 800 páginas y la API del Negocio las asigna el administrador en «Cambiar plan». Si cambias un número aquí,
 * cámbialo allá: hay una prueba (`backend/tests/test_planes_publicados.py`) que se pone roja si se
 * desfasan, pero solo corre en el otro repositorio, así que **esta landing puede mentir sin que nada
 * avise**. Y el que se entera primero es quien se registra.
 */
@Component({
  selector: 'app-planes',
  imports: [Revelar],
  templateUrl: './planes.html',
  styleUrl: './planes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Planes {
  protected readonly enlacePrueba = enlacePrueba();

  // Sin «página de más»: el servicio no cobra excedente todavía (BL-35). Al acabarse la cuota, espera al
  // mes siguiente o a un cambio de plan. Publicar un precio por página extra sería prometer algo que no pasa.
  protected readonly planes: readonly IPlan[] = [
    {
      nombre: 'Gratis',
      precio: 'COP 0',
      nota: '10 páginas al mes, para siempre',
      descripcion: 'Para probar con tus propios documentos, sin fecha de vencimiento.',
      incluye: [
        'Desde el panel, sin programar',
        'Las 22 plantillas del catálogo',
        'Facturas en XML sin descontar páginas',
        'Sin tarjeta de crédito',
      ],
      accion: 'Crear mi cuenta gratis',
      destacado: false,
    },
    {
      nombre: 'Personal',
      precio: 'COP 19.900 / mes',
      nota: '250 páginas, unas 125 facturas',
      descripcion: 'Para quien lee documentos cada semana y quiere dejar de digitar.',
      incluye: [
        'Desde el panel y por correo',
        'Plantillas propias, con versiones',
        'Afina tus plantillas con tus documentos',
        'Evidencia por campo y avisos contables',
      ],
      accion: 'Empezar',
      destacado: true,
    },
    {
      nombre: 'Negocio',
      precio: 'COP 59.900 / mes',
      nota: '800 páginas, unas 400 facturas',
      descripcion: 'Para empresas que conectan el servicio a su propio sistema.',
      incluye: [
        'Todo lo del plan Personal',
        'La API, con su colección de Postman',
        'Trabajos en segundo plano y webhooks',
        'Keys de prueba para integrar sin costo',
      ],
      accion: 'Empezar',
      destacado: false,
    },
  ];
}
