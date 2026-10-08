import { describe, expect, it } from 'vitest';
import { MAX_DIGITOS, calcular, conPuntos, digitoDeVerificacion, dvEscrito } from './nit';

/**
 * El cálculo está portado del backend (`nit_check_digit`), así que lo que importa probar no es la
 * aritmética del módulo 11 —esa ya está probada allá— sino **lo que hace la gente**: pegar el NIT como
 * viene en la factura, con puntos, con el guion, con «NIT.» delante.
 */
describe('dígito de verificación del NIT', () => {
  it('da el mismo dígito que el backend para NIT conocidos', () => {
    expect(digitoDeVerificacion('900276962')).toBe(1);
    expect(digitoDeVerificacion('800197268')).toBe(4);
    expect(digitoDeVerificacion('830053105')).toBe(3);
  });

  it('acepta el NIT pegado tal como viene en la factura', () => {
    // Con puntos, con el guion, con el rótulo: es lo que sale al copiar de un PDF.
    for (const entrada of ['900.276.962-1', 'NIT. 900276962-1', '  900 276 962 - 1 ']) {
      expect(calcular(entrada, true)).toMatchObject({ ok: true, digitos: '900276962', dv: 1 });
    }
  });

  it('sin el dígito, usa todo lo escrito', () => {
    expect(calcular('900.276.962', false)).toMatchObject({ ok: true, dv: 1, formateado: '900.276.962-1' });
  });

  it('dice qué dígito traía lo que se pegó, para poder compararlo', () => {
    expect(dvEscrito('900.276.962-7', true)).toBe(7);
    expect(dvEscrito('900.276.962', false)).toBeNull();
  });

  it('un NIT que empieza por cero conserva sus dígitos', () => {
    // `Number()` se los comería; por eso el cálculo trabaja sobre el texto y no sobre un número.
    expect(calcular('012345678', false)).toMatchObject({ ok: true, digitos: '012345678' });
  });

  it('avisa en vez de calcular cuando no hay nada que calcular', () => {
    expect(calcular('   ', true)).toEqual({ ok: false, motivo: 'vacio' });
    expect(calcular('abc', false)).toEqual({ ok: false, motivo: 'sin-digitos' });
    expect(calcular('1'.repeat(MAX_DIGITOS + 1), false)).toEqual({ ok: false, motivo: 'muy-largo' });
  });

  it('un solo dígito con el guion marcado no deja nada que calcular', () => {
    expect(calcular('7', true)).toEqual({ ok: false, motivo: 'sin-digitos' });
  });

  it('formatea como se lee en la factura', () => {
    expect(conPuntos('900276962')).toBe('900.276.962');
    expect(conPuntos('12345')).toBe('12.345');
    expect(conPuntos('12')).toBe('12');
  });
});
