import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Revelar } from '../../compartido/revelar';
import { SITIO, enlacePrueba } from '../../configuracion/sitio';

/** El llamado final a pedir la prueba y el pie de página. */
@Component({
  selector: 'app-cierre',
  imports: [Revelar],
  templateUrl: './cierre.html',
  styleUrl: './cierre.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cierre {
  protected readonly sitio = SITIO;
  protected readonly enlacePrueba = enlacePrueba();
  protected readonly anio = new Date().getFullYear();
}
