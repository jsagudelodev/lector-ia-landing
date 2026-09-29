import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Revelar } from '../../compartido/revelar';

interface IPaso {
  readonly numero: string;
  readonly titulo: string;
  readonly texto: string;
}

@Component({
  selector: 'app-como-funciona',
  imports: [Revelar],
  templateUrl: './como-funciona.html',
  styleUrl: './como-funciona.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComoFunciona {
  protected readonly pasos: readonly IPaso[] = [
    {
      numero: '01',
      titulo: 'Dile qué quieres',
      texto:
        'Elige una plantilla del catálogo o pega el JSON que esperas recibir. ¿No sabes por dónde empezar? Sube un documento y el servicio te propone la estructura.',
    },
    {
      numero: '02',
      titulo: 'Sube el documento',
      texto:
        'Un PDF, una foto, el XML de la factura electrónica o su URL. Desde el panel, sin programar, o desde tu sistema con la API.',
    },
    {
      numero: '03',
      titulo: 'Recibe los datos',
      texto:
        'En JSON o Excel, con la evidencia de cada campo y los avisos si algo no cuadra. O a tu correo, para reenviarlo a quien lo necesite.',
    },
  ];

  protected readonly ventajasAfinado = [
    'Los campos nuevos entran solo cuando se repiten',
    'El mismo documento no cuenta dos veces',
    'Te dice cuándo la plantilla ya está lista',
  ];
}
