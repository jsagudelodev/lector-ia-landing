import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SITIO, enlacePrueba } from '../../configuracion/sitio';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.html',
  styleUrl: './encabezado.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Encabezado {
  protected readonly sitio = SITIO;
  protected readonly enlacePrueba = enlacePrueba();
  protected readonly menuAbierto = signal(false);

  protected readonly enlaces = [
    // `/#…` y no `#…`: así llevan a la sección del inicio también desde la página de una herramienta.
    { texto: 'Producto', href: '/#producto' },
    { texto: 'Cómo funciona', href: '/#como-funciona' },
    { texto: 'Plantillas', href: '/#plantillas' },
    { texto: 'Planes', href: '/#planes' },
    { texto: 'XML a Excel gratis', href: '/xml-dian-a-excel' },
  ] as const;

  protected alternarMenu(): void {
    this.menuAbierto.update((abierto) => !abierto);
  }

  protected cerrarMenu(): void {
    this.menuAbierto.set(false);
  }
}
