import { ChangeDetectionStrategy, Component } from '@angular/core';
import { enlacePrueba } from '../../configuracion/sitio';

interface ICampoDemo {
  readonly clave: string;
  readonly valor: string;
}

@Component({
  selector: 'app-portada',
  templateUrl: './portada.html',
  styleUrl: './portada.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Portada {
  protected readonly enlacePrueba = enlacePrueba();

  /** Datos ficticios: la animación muestra la forma de la respuesta, no un cliente real. */
  protected readonly campos: readonly ICampoDemo[] = [
    { clave: 'numero_factura', valor: '"FE-10432"' },
    { clave: 'nit_emisor', valor: '"900123456-8"' },
    { clave: 'fecha_emision', valor: '"2026-09-15"' },
    { clave: 'subtotal', valor: '4200000' },
    { clave: 'iva', valor: '798000' },
    { clave: 'total', valor: '4998000' },
  ];

  protected readonly garantias = ['Sin guardar tus documentos', '22 plantillas listas', 'API y panel sin código'];

  /** Cada fila aparece un poco después de la anterior, como si se fuera leyendo. */
  protected retraso(indice: number): string {
    return `${indice * 180 + 600}ms`;
  }
}
