import { TestBed } from '@angular/core/testing';
import { RevisarFactura } from './revisar-factura';

describe('RevisarFactura', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [RevisarFactura] }).compileComponents();
  });

  it('presenta la herramienta y su puente al lector', async () => {
    const fixture = TestBed.createComponent(RevisarFactura);
    await fixture.whenStable();
    const pagina = fixture.nativeElement as HTMLElement;

    expect(pagina.querySelector('h1')?.textContent).toContain('cuadra');
    expect(pagina.textContent).toContain('¿Recibes facturas en PDF o en foto?');
  });

  it('rechaza lo que no es XML ni ZIP sin llamar al servicio', async () => {
    const fixture = TestBed.createComponent(RevisarFactura);
    await fixture.whenStable();
    const entrada = (fixture.nativeElement as HTMLElement).querySelector<HTMLInputElement>('#factura')!;

    Object.defineProperty(entrada, 'files', { value: [new File(['x'], 'foto.jpg')], configurable: true });
    entrada.dispatchEvent(new Event('change'));
    await fixture.whenStable();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('solo se revisan facturas electrónicas');
  });
});
