import { TestBed } from '@angular/core/testing';
import { XmlDianExcel } from './xml-dian-excel';

describe('XmlDianExcel', () => {
  const archivo = (nombre: string) => new File(['<Invoice/>'], nombre);

  /** Simula elegir archivos en el campo, que es lo que hace quien usa la página. */
  const elegir = async (fixture: { nativeElement: HTMLElement; whenStable: () => Promise<unknown> }, archivos: File[]) => {
    const entrada = fixture.nativeElement.querySelector<HTMLInputElement>('#archivos')!;
    // jsdom no tiene DataTransfer: la página solo necesita poder recorrer la lista.
    Object.defineProperty(entrada, 'files', { value: archivos, configurable: true });
    entrada.dispatchEvent(new Event('change'));
    await fixture.whenStable();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [XmlDianExcel] }).compileComponents();
  });

  it('presenta la herramienta y su puente al lector', async () => {
    const fixture = TestBed.createComponent(XmlDianExcel);
    await fixture.whenStable();
    const pagina = fixture.nativeElement as HTMLElement;

    expect(pagina.querySelector('h1')?.textContent).toContain('XML a Excel');
    expect(pagina.textContent).toContain('¿Solo tienes el PDF o una foto de la factura?');
  });

  it('acepta XML y ZIP, y avisa de lo que dejó fuera', async () => {
    const fixture = TestBed.createComponent(XmlDianExcel);
    await fixture.whenStable();

    await elegir(fixture, [archivo('a.xml'), archivo('b.ZIP'), archivo('foto.jpg')]);
    const pagina = fixture.nativeElement as HTMLElement;

    expect(pagina.querySelectorAll('.lista__archivo').length).toBe(2);
    expect(pagina.textContent).toContain('Dejamos fuera 1 archivo');
  });
});
