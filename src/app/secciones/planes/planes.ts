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
 * Los montos salen del costo real medido —entre USD 0,002 y 0,004 por página— y del trabajo que
 * reemplazan, no de lo que cobra la competencia: un OCR por página es un componente, no un producto.
 *
 * **Están publicados a propósito.** Antes decían «a consultar», y eso no aplaza la decisión: la toma
 * el visitante, que asume que es caro y se va sin escribir. Un precio que se queda corto se corrige
 * en una semana; a quien se fue no se le vuelve a ver.
 *
 * Los pesos son una referencia a COP 4.000 por dólar: revísalos si el dólar se mueve de verdad.
 *
 * **Las cuotas de aquí existen de verdad en el backend y no pueden separarse.** Viven en
 * `lector-ia-backend`, en `backend/app/core/config.py`: `TRIAL_MONTHLY_QUOTA_PAGES` (50),
 * `TRIAL_DAYS` (14) y `DEFAULT_MONTHLY_QUOTA_PAGES` (300, el Starter). Si cambias un número aquí,
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

  protected readonly planes: readonly IPlan[] = [
    {
      nombre: 'Prueba',
      precio: 'Gratis',
      nota: '50 páginas durante 14 días',
      descripcion: 'Para probar con tus propios documentos antes de decidir.',
      incluye: [
        'Panel y API completos',
        'Las 22 plantillas del catálogo',
        'Keys de prueba sin costo',
        'Sin tarjeta de crédito',
      ],
      accion: 'Pedir la prueba',
      destacado: false,
    },
    {
      nombre: 'Starter',
      precio: 'USD 10 / mes',
      nota: '≈ COP 40.000 · 300 páginas · USD 0,05 la página de más',
      descripcion: 'Para quien lee documentos cada semana y quiere dejar de digitar.',
      incluye: [
        '300 páginas al mes',
        'Las 22 plantillas del catálogo',
        'Plantillas propias, con versiones',
        'Evidencia por campo y avisos contables',
      ],
      accion: 'Empezar',
      destacado: false,
    },
    {
      nombre: 'Pro',
      precio: 'USD 30 / mes',
      nota: '≈ COP 120.000 · 1.200 páginas · USD 0,04 la página de más',
      descripcion: 'Para equipos que procesan documentos todos los días.',
      incluye: [
        '1.200 páginas al mes',
        'Afina tus plantillas con tus documentos',
        'Trabajos en segundo plano y webhooks',
        'Reintentos sin cobro doble',
      ],
      accion: 'Empezar',
      destacado: true,
    },
  ];
}
