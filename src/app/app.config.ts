import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay, withIncrementalHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Incremental: cada sección se activa al llegar a la pantalla. El HTML ya viene completo del
    // prerenderizado; lo que se aplaza es el JavaScript, que en celular bloqueaba la página al cargar.
    provideClientHydration(withEventReplay(), withIncrementalHydration()),
  ],
};
