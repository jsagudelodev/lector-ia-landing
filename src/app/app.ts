import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Metadatos } from './compartido/metadatos';
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
  // Lo que se ve al abrir se activa de una vez; el resto, al acercarse a la pantalla (ver app.config.ts).
  template: `
    <app-encabezado />
    <main>
      <app-portada />
      @defer (hydrate on viewport) { <app-beneficios /> }
      @defer (hydrate on viewport) { <app-como-funciona /> }
      @defer (hydrate on viewport) { <app-plantillas /> }
      @defer (hydrate on viewport) { <app-desarrolladores /> }
      @defer (hydrate on viewport) { <app-privacidad /> }
      @defer (hydrate on viewport) { <app-planes /> }
      @defer (hydrate on viewport) { <app-preguntas /> }
    </main>
    @defer (hydrate on viewport) { <app-cierre /> }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly metadatos = inject(Metadatos);

  constructor() {
    this.metadatos.aplicar();
  }
}
