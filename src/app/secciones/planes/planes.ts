import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Revelar } from '../../compartido/revelar';
import { enlacePrueba } from '../../configuracion/sitio';

interface IPlan {
  readonly nombre: string;
  readonly precio: string;
  readonly descripcion: string;
  readonly incluye: readonly string[];
  readonly accion: string;
  readonly destacado: boolean;
}

/**
 * Los montos no están decididos (BL-47 del backend): por eso los planes dicen «a consultar» y
 * describen lo que cada uno incluye, que sí existe hoy.
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
      descripcion: 'Para probar con tus propios documentos antes de decidir.',
      incluye: ['Páginas para tus pruebas', 'Panel y API completos', 'Las 22 plantillas del catálogo', 'Keys de prueba sin costo'],
      accion: 'Pedir la prueba',
      destacado: false,
    },
    {
      nombre: 'Pro',
      precio: 'A consultar',
      descripcion: 'Para equipos que leen documentos todos los meses.',
      incluye: [
        'Cuota mensual de páginas a tu medida',
        'Plantillas propias, con versiones',
        'Afina tus plantillas con tus documentos',
        'Evidencia por campo y avisos contables',
      ],
      accion: 'Hablemos',
      destacado: true,
    },
    {
      nombre: 'Empresa',
      precio: 'A consultar',
      descripcion: 'Para volúmenes altos o documentos muy propios.',
      incluye: [
        'Volumen alto y trabajos en segundo plano',
        'Plantillas hechas para tus documentos',
        'Acompañamiento en la integración',
        'Webhooks y reintentos sin cobro doble',
      ],
      accion: 'Hablemos',
      destacado: false,
    },
  ];
}
