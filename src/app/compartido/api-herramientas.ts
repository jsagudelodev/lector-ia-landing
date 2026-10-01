import { isDevMode } from '@angular/core';
import { SITIO } from '../configuracion/sitio';

/** La API de las herramientas gratis: la pública, o el backend local cuando se corre con `npm start`. */
export function urlHerramienta(ruta: string): string {
  return `${isDevMode() ? SITIO.urlApiLocal : SITIO.urlApi}/api/v1/tools/${ruta}`;
}

/** El mensaje que ve la persona cuando la API responde con error: el del servicio, o uno que se entienda. */
export async function mensajeDeError(respuesta: Response, porDefecto: string): Promise<string> {
  if (respuesta.status === 429) {
    return 'Hiciste muchas consultas seguidas. Espera un minuto y vuelve a intentarlo.';
  }
  try {
    const cuerpo = (await respuesta.json()) as { detail?: string };
    return cuerpo.detail ?? porDefecto;
  } catch {
    return porDefecto;
  }
}

export const SIN_CONEXION = 'No pudimos conectarnos con el servicio. Revisa tu conexión e inténtalo de nuevo.';

/** Descarga un archivo que llegó en la respuesta, sin abrir otra pestaña. */
export function descargarArchivo(contenido: Blob, nombre: string): void {
  const url = URL.createObjectURL(contenido);
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = nombre;
  enlace.click();
  URL.revokeObjectURL(url);
}
