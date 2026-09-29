/**
 * Datos del sitio que cambian con el despliegue. Todo lo provisional vive aquí, para cambiarlo en un
 * solo lugar cuando haya dominio propio.
 */
export const SITIO = {
  producto: 'Lector PDF IA',
  empresa: 'Ingenio',
  /** Correo que recibe las solicitudes de prueba. PENDIENTE: el del dominio propio. */
  correoContacto: 'hola@tu-dominio.com',
  /** Panel web del cliente. PENDIENTE: su URL pública. */
  urlPanel: '#',
  /** API pública, para los ejemplos de código. PENDIENTE: la URL con dominio propio. */
  urlApi: 'https://api.tu-dominio.com',
  /** Documentación de la API (/redoc). PENDIENTE: su URL pública. */
  urlDocumentacion: '#',
} as const;

/** `mailto:` con el asunto y el cuerpo ya escritos, para que pedir la prueba sea un solo clic. */
export function enlacePrueba(): string {
  const asunto = encodeURIComponent(`Quiero probar ${SITIO.producto}`);
  const cuerpo = encodeURIComponent(
    'Hola,\n\nMe gustaría probar el servicio.\n\nEmpresa:\nQué documentos quiero leer:\nCuántos al mes, aproximadamente:\n',
  );
  return `mailto:${SITIO.correoContacto}?subject=${asunto}&body=${cuerpo}`;
}
