/**
 * El dígito de verificación de un NIT, por el módulo 11 de la DIAN.
 *
 * Es el mismo cálculo que el backend usa para avisar `invalid_check_digit` (BL-22), portado aquí a
 * propósito: **esta herramienta no manda nada a ningún servidor**. Un NIT es un dato de una empresa y
 * no hay razón para que viaje por la red solo para multiplicar quince números.
 *
 * Lo que **no** hace, y la página tiene que decirlo: no confirma que el NIT exista ni en qué estado
 * está ante la DIAN. Solo comprueba que el número sea consistente consigo mismo.
 */

/** Los pesos del módulo 11, de derecha a izquierda. Son los de la DIAN, no se eligen. */
const PESOS = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71] as const;

/** Lo más largo que admite el cálculo: hay quince pesos. */
export const MAX_DIGITOS = PESOS.length;

export type ResultadoNit =
  | { readonly ok: true; readonly digitos: string; readonly dv: number; readonly formateado: string }
  | { readonly ok: false; readonly motivo: 'vacio' | 'sin-digitos' | 'muy-largo' };

/** Solo los dígitos: se escribe con puntos, con espacios, con el «NIT.» delante o pegado al DV. */
function soloDigitos(texto: string): string {
  return texto.replace(/\D/g, '');
}

/** `900276962` → `900.276.962`, que es como se lee y como está impreso en la factura. */
export function conPuntos(digitos: string): string {
  return digitos.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function digitoDeVerificacion(digitos: string): number {
  const total = [...digitos].reverse().reduce((suma, digito, i) => suma + Number(digito) * PESOS[i], 0);
  const resto = total % 11;
  return resto < 2 ? resto : 11 - resto;
}

/**
 * Calcula el dígito de lo que la persona escribió.
 *
 * Si pega el NIT completo —`900.276.962-1`, como viene en la factura— se usa todo **menos el último
 * dígito**, que es el que se quiere comprobar. Es lo que hace cualquiera: copiar y pegar.
 */
export function calcular(entrada: string, incluyeDv: boolean): ResultadoNit {
  if (!entrada.trim()) {
    return { ok: false, motivo: 'vacio' };
  }
  const todos = soloDigitos(entrada);
  const digitos = incluyeDv ? todos.slice(0, -1) : todos;
  if (!digitos) {
    return { ok: false, motivo: 'sin-digitos' };
  }
  if (digitos.length > MAX_DIGITOS) {
    return { ok: false, motivo: 'muy-largo' };
  }
  const dv = digitoDeVerificacion(digitos);
  return { ok: true, digitos, dv, formateado: `${conPuntos(digitos)}-${dv}` };
}

/** El dígito que traía lo que se pegó, para poder decir si coincide. Null si no se escribió ninguno. */
export function dvEscrito(entrada: string, incluyeDv: boolean): number | null {
  const todos = soloDigitos(entrada);
  return incluyeDv && todos.length > 1 ? Number(todos.at(-1)) : null;
}
