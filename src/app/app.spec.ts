import { DeferBlockState, TestBed } from '@angular/core/testing';
import { Inicio } from './paginas/inicio/inicio';
import { Encabezado } from './secciones/encabezado/encabezado';

describe('Inicio', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Inicio, Encabezado] }).compileComponents();
  });

  it('muestra el titular de la portada', async () => {
    const fixture = TestBed.createComponent(Inicio);
    await fixture.whenStable();
    const pagina = fixture.nativeElement as HTMLElement;

    expect(pagina.querySelector('h1')?.textContent).toContain('convertidos en datos');
  });

  it('tiene todas las secciones a las que enlaza el menú', async () => {
    const menu = TestBed.createComponent(Encabezado);
    const inicio = TestBed.createComponent(Inicio);
    await Promise.all([menu.whenStable(), inicio.whenStable()]);
    // Las secciones van en `@defer`: en el navegador se muestran al llegar a la pantalla, aquí se piden.
    for (const bloque of await inicio.getDeferBlocks()) {
      await bloque.render(DeferBlockState.Complete);
    }
    const pagina = inicio.nativeElement as HTMLElement;

    // Los enlaces del menú son `/#seccion`, para que funcionen desde cualquier página.
    const destinos = [...(menu.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>('a[href^="/#"]')].map(
      (a) => a.getAttribute('href')!.slice(1),
    );
    expect(destinos.length).toBeGreaterThan(0);
    for (const destino of destinos) {
      expect(pagina.querySelector(destino), `falta la sección ${destino}`).not.toBeNull();
    }
  });
});
