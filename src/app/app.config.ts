import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay, withIncrementalHydration } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Los enlaces del menú son `/#seccion`: con esto bajan a la sección también desde otra página.
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })),
    // Incremental: cada sección se activa al llegar a la pantalla. El HTML ya viene completo del
    // prerenderizado; lo que se aplaza es el JavaScript, que en celular bloqueaba la página al cargar.
    provideClientHydration(withEventReplay(), withIncrementalHydration()),
  ],
};
