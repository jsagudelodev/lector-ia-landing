import { Routes } from '@angular/router';
import { DigitoNit } from './paginas/digito-nit/digito-nit';
import { Inicio } from './paginas/inicio/inicio';
import { RevisarFactura } from './paginas/revisar-factura/revisar-factura';
import { XmlDianExcel } from './paginas/xml-dian-excel/xml-dian-excel';

/**
 * Cada herramienta gratis tiene su propia dirección: es lo que la hace aparecer cuando alguien busca
 * «XML DIAN a Excel». Todas se prerenderizan (ver app.routes.server.ts).
 */
export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'xml-dian-a-excel', component: XmlDianExcel },
  { path: 'revisar-factura-electronica', component: RevisarFactura },
  { path: 'digito-de-verificacion-nit', component: DigitoNit },
  { path: '**', redirectTo: '' },
];
