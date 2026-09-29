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
    { texto: 'Producto', href: '#producto' },
    { texto: 'Cómo funciona', href: '#como-funciona' },
    { texto: 'Plantillas', href: '#plantillas' },
    { texto: 'Desarrolladores', href: '#desarrolladores' },
    { texto: 'Planes', href: '#planes' },
  ] as const;

  protected alternarMenu(): void {
    this.menuAbierto.update((abierto) => !abierto);
  }

  protected cerrarMenu(): void {
    this.menuAbierto.set(false);
  }
}
