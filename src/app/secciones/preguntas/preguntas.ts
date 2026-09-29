import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Revelar } from '../../compartido/revelar';

interface IPregunta {
  readonly pregunta: string;
  readonly respuesta: string;
}

@Component({
  selector: 'app-preguntas',
  imports: [Revelar],
  templateUrl: './preguntas.html',
  styleUrl: './preguntas.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Preguntas {
  protected readonly preguntas: readonly IPregunta[] = [
    {
      pregunta: '¿Guardan mis documentos?',
      respuesta:
        'No. El documento se lee para darte los datos y no queda guardado. Si lo mandas a procesar en segundo plano, se borra en cuanto termina, y el resultado a las 24 horas.',
    },
    {
      pregunta: '¿Necesito saber programar?',
      respuesta:
        'No. Desde el panel subes el documento, eliges la plantilla y descargas el Excel, o te lo envías al correo. La API es para cuando quieras conectarlo a tu sistema.',
    },
    {
      pregunta: '¿Qué pasa si el documento es un escaneo o una foto?',
      respuesta:
        'Se lee igual. Lo que cambia es que en un escaneo no hay texto contra el cual comprobar cada dato, y la respuesta te lo dice, para que sepas que esa verificación no aplicó.',
    },
    {
      pregunta: '¿Cómo sé si un dato quedó mal?',
      respuesta:
        'Cada resultado revisa sus propias cuentas —totales, impuestos, líneas— y te dice si conviene que una persona lo mire y por qué. Si lo pides, cada dato trae además la página y el texto exacto de donde salió.',
    },
    {
      pregunta: '¿Mi documento no está en el catálogo, sirve igual?',
      respuesta:
        'Sí. Pega el JSON que esperas recibir y el servicio lo llena, o sube un documento y te propone la estructura. Después la afinas con más documentos del mismo tipo.',
    },
    {
      pregunta: '¿Cómo se cobra?',
      respuesta:
        'Por páginas procesadas, descontadas de la cuota mensual de tu plan. Las facturas leídas desde su XML de la DIAN no descuentan páginas, y repetir el mismo documento dentro de las 24 horas tampoco.',
    },
  ];
}
