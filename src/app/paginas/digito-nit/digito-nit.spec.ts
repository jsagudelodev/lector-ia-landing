import { TestBed } from '@angular/core/testing';
import { DigitoNit } from './digito-nit';

/** Lo que se prueba es la pantalla; el cálculo tiene sus propias pruebas en `compartido/nit.spec.ts`. */
describe('DigitoNit', () => {
  async function abrir() {
    await TestBed.configureTestingModule({ imports: [DigitoNit] }).compileComponents();
    const fixture = TestBed.createComponent(DigitoNit);
    await fixture.whenStable();
    return fixture;
  }

  function escribir(fixture: Awaited<ReturnType<typeof abrir>>, valor: string) {
    const entrada = (fixture.nativeElement as HTMLElement).querySelector<HTMLInputElement>('input[type="text"]')!;
    entrada.value = valor;
    entrada.dispatchEvent(new Event('input'));
    return fixture.whenStable();
  }

  it('presenta la herramienta y su puente al lector', async () => {
    const pagina = (await abrir()).nativeElement as HTMLElement;

    expect(pagina.querySelector('h1')?.textContent).toContain('dígito de verificación');
    expect(pagina.textContent).toContain('¿Lo estás sacando de una factura?');
  });

  it('dice que el número no sale del navegador, que es lo que la distingue', async () => {
    const pagina = (await abrir()).nativeElement as HTMLElement;

    expect(pagina.textContent).toContain('no sale de tu computador');
  });

  it('advierte que no confirma que el NIT exista', async () => {
    // Sin esto, alguien podría leer un dígito correcto como «este NIT está al día ante la DIAN».
    const pagina = (await abrir()).nativeElement as HTMLElement;

    expect(pagina.textContent).toContain('No confirma que el NIT');
  });

  it('calcula mientras se escribe, sin botón', async () => {
    const fixture = await abrir();

    await escribir(fixture, '900.276.962-1');

    const pagina = fixture.nativeElement as HTMLElement;
    expect(pagina.querySelector('.resultado__dv')?.textContent?.trim()).toBe('1');
    expect(pagina.textContent).toContain('Coincide con el que escribiste');
  });

  it('avisa cuando el dígito escrito no es el que corresponde', async () => {
    const fixture = await abrir();

    await escribir(fixture, '900.276.962-7');

    const pagina = fixture.nativeElement as HTMLElement;
    expect(pagina.textContent).toContain('No coincide');
    expect(pagina.querySelector('.resultado--malo')).not.toBeNull();
  });

  it('no muestra nada ni se queja con el campo vacío', async () => {
    const pagina = (await abrir()).nativeElement as HTMLElement;

    expect(pagina.querySelector('.resultado')).toBeNull();
    expect(pagina.querySelector('.calculadora__error')).toBeNull();
  });
});
