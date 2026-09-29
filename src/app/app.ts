import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Beneficios } from './secciones/beneficios/beneficios';
import { Cierre } from './secciones/cierre/cierre';
import { ComoFunciona } from './secciones/como-funciona/como-funciona';
import { Desarrolladores } from './secciones/desarrolladores/desarrolladores';
import { Encabezado } from './secciones/encabezado/encabezado';
import { Planes } from './secciones/planes/planes';
import { Plantillas } from './secciones/plantillas/plantillas';
import { Portada } from './secciones/portada/portada';
import { Preguntas } from './secciones/preguntas/preguntas';
import { Privacidad } from './secciones/privacidad/privacidad';

@Component({
  selector: 'app-root',
  imports: [
    Encabezado,
    Portada,
    Beneficios,
    ComoFunciona,
    Plantillas,
    Desarrolladores,
    Privacidad,
    Planes,
    Preguntas,
    Cierre,
  ],
  template: `
    <app-encabezado />
    <main>
      <app-portada />
      <app-beneficios />
      <app-como-funciona />
      <app-plantillas />
      <app-desarrolladores />
      <app-privacidad />
      <app-planes />
      <app-preguntas />
    </main>
    <app-cierre />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
