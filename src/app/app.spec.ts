import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('muestra el titular de la portada', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const pagina = fixture.nativeElement as HTMLElement;

    expect(pagina.querySelector('h1')?.textContent).toContain('convertidos en datos');
  });

  it('tiene todas las secciones a las que enlaza el menú', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const pagina = fixture.nativeElement as HTMLElement;

    // `#` a secas es la URL del panel, que todavía no está definida (ver `SITIO.urlPanel`): no es una sección.
    const destinos = [...pagina.querySelectorAll<HTMLAnchorElement>('app-encabezado a[href^="#"]')]
      .map((a) => a.getAttribute('href'))
      .filter((href) => href !== '#');
    for (const destino of destinos) {
      expect(pagina.querySelector(destino!), `falta la sección ${destino}`).not.toBeNull();
    }
  });
});
