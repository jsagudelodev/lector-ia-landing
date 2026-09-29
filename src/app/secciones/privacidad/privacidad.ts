import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Revelar } from '../../compartido/revelar';

/** Lo que el servicio garantiza hoy (sección 14 de FUNCIONALIDADES en el backend). */
@Component({
  selector: 'app-privacidad',
  imports: [Revelar],
  templateUrl: './privacidad.html',
  styleUrl: './privacidad.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Privacidad {
  protected readonly garantias = [
    {
      titulo: 'Tus documentos no se guardan',
      texto: 'Se leen y se olvidan. Los que van en segundo plano se borran al terminar de procesarse.',
    },
    {
      titulo: 'El visor corre en tu navegador',
      texto: 'Cuando el panel te muestra de dónde salió cada dato, el PDF no vuelve a subirse a ningún lado.',
    },
    {
      titulo: 'Cada cuenta ve solo lo suyo',
      texto: 'Tus solicitudes, tus plantillas y tu historial están separados de los de cualquier otra empresa.',
    },
    {
      titulo: 'Pensado para la Ley 1581',
      texto: 'El historial de consumo se anonimiza a los 12 meses, sin tocar tu facturación.',
    },
  ];
}
