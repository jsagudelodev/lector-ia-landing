import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { SITIO } from '../configuracion/sitio';

/**
 * Las etiquetas que dependen de la dirección del sitio. Van aquí y no fijas en index.html porque las
 * redes exigen URL absolutas, y la dirección cambia con el dominio. Se escriben al prerenderizar, así
 * que quedan en el HTML, que es lo único que leen WhatsApp, LinkedIn y los buscadores.
 */
@Injectable({ providedIn: 'root' })
export class Metadatos {
  private readonly meta = inject(Meta);
  private readonly documento = inject(DOCUMENT);

  aplicar(): void {
    const url = `${SITIO.urlSitio}/`;
    const imagen = `${SITIO.urlSitio}/og-image.png`;

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
