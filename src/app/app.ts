import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Encabezado } from './secciones/encabezado/encabezado';

/** El encabezado es de todas las páginas; lo demás lo pone cada una (ver app.routes.ts). */
@Component({
  selector: 'app-root',
  imports: [Encabezado, RouterOutlet],
  template: `
    <app-encabezado />
    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
