import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SITIO } from '../configuracion/sitio';

/** Lo que cambia de una página a otra: dónde está y cómo se presenta en buscadores y redes. */
export interface IPaginaMetadatos {
  /** Ruta dentro del sitio, con la barra inicial: `/` o `/xml-dian-a-excel`. */
  readonly ruta: string;
  readonly titulo: string;
  readonly descripcion: string;
}

/** El inicio: los mismos textos que trae index.html, para que una página no herede los de otra. */
export const METADATOS_INICIO: IPaginaMetadatos = {
  ruta: '/',
  titulo: 'Lector PDF IA · Tus documentos convertidos en datos',
  descripcion:
    'Sube un PDF, una foto o el XML de la factura electrónica y recibe los datos como JSON o Excel. Cada dato dice de dónde salió, y el servicio avisa cuando algo no cuadra.',
};

/**
 * Las etiquetas de cada página. Van aquí y no fijas en index.html porque las redes exigen URL absolutas,
 * la dirección cambia con el dominio y cada página tiene la suya. Se escriben al prerenderizar, así que
 * quedan en el HTML, que es lo único que leen WhatsApp, LinkedIn y los buscadores.
 */
@Injectable({ providedIn: 'root' })
export class Metadatos {
  private readonly meta = inject(Meta);
  private readonly titulo = inject(Title);
  private readonly documento = inject(DOCUMENT);

  aplicar(pagina: IPaginaMetadatos = METADATOS_INICIO): void {
    const url = `${SITIO.urlSitio}${pagina.ruta}`;
    const imagen = `${SITIO.urlSitio}/og-image.png`;

    this.titulo.setTitle(pagina.titulo);
    this.meta.updateTag({ name: 'description', content: pagina.descripcion });
    this.meta.updateTag({ property: 'og:title', content: pagina.titulo });
    this.meta.updateTag({ property: 'og:description', content: pagina.descripcion });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: imagen });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:image:alt', content: `${SITIO.producto}: tus documentos convertidos en datos` });
    this.meta.updateTag({ name: 'twitter:image', content: imagen });

    let canonica = this.documento.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonica) {
      canonica = this.documento.createElement('link');
      canonica.rel = 'canonical';
      this.documento.head.appendChild(canonica);
    }
    canonica.href = url;
  }
}
