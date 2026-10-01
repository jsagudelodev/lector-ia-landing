import { Routes } from '@angular/router';
import { Inicio } from './paginas/inicio/inicio';
import { XmlDianExcel } from './paginas/xml-dian-excel/xml-dian-excel';

/**
 * Cada herramienta gratis tiene su propia dirección: es lo que la hace aparecer cuando alguien busca
 * «XML DIAN a Excel». Todas se prerenderizan (ver app.routes.server.ts).
 */
export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'xml-dian-a-excel', component: XmlDianExcel },
  { path: '**', redirectTo: '' },
];
