import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';

/**
 * Hace aparecer el elemento cuando entra en pantalla. Solo corre en el navegador: en el
 * prerenderizado no hay `IntersectionObserver`, y el HTML sale visible (ver `.js .revelar` en styles).
 */
@Directive({
  selector: '[appRevelar]',
  host: { class: 'revelar' },
})
export class Revelar {
  private readonly elemento = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      // Sin IntersectionObserver (navegadores viejos) se muestra de una vez: la animación es un adorno.
      if (typeof IntersectionObserver === 'undefined') {
        this.elemento.nativeElement.classList.add('revelar--visible');
        return;
      }
      const observador = new IntersectionObserver(
        ([entrada]) => {
          if (entrada?.isIntersecting) {
            this.elemento.nativeElement.classList.add('revelar--visible');
            observador.disconnect();
          }
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
      );
      observador.observe(this.elemento.nativeElement);
      this.destroyRef.onDestroy(() => observador.disconnect());
    });
  }
}
