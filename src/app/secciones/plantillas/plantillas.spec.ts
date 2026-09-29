import { TestBed } from '@angular/core/testing';
import { Plantillas } from './plantillas';

describe('Plantillas', () => {
  const nombresVisibles = (pagina: HTMLElement): string[] =>
    [...pagina.querySelectorAll('.plantillas__item span:first-child')].map((s) => s.textContent?.trim() ?? '');

  const filtrar = async (pagina: HTMLElement, pais: string, fixture: { whenStable: () => Promise<unknown> }) => {
    const boton = [...pagina.querySelectorAll<HTMLButtonElement>('.plantillas__filtro')].find(
      (b) => b.textContent?.trim() === pais,
    );
    boton!.click();
    await fixture.whenStable();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Plantillas] }).compileComponents();
  });

  it('muestra las 22 plantillas sin filtro', async () => {
    const fixture = TestBed.createComponent(Plantillas);
    await fixture.whenStable();

    expect(nombresVisibles(fixture.nativeElement)).toHaveLength(22);
  });

  it('al filtrar por país deja las de ese país y las internacionales', async () => {
    const fixture = TestBed.createComponent(Plantillas);
    await fixture.whenStable();
    const pagina = fixture.nativeElement as HTMLElement;

    await filtrar(pagina, 'Ecuador', fixture);
    const visibles = nombresVisibles(pagina);

    expect(visibles).toContain('Declaración aduanera de importación (SENAE)');
    expect(visibles).toContain('Factura comercial de importación');
    expect(visibles).not.toContain('RUT');
    expect(visibles).not.toContain('Pedimento de importación');
  });
});
