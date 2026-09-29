import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Revelar } from '../../compartido/revelar';

type CodigoPais = 'CO' | 'EC' | 'MX' | 'INT';

interface IPlantilla {
  readonly nombre: string;
  readonly grupo: string;
  readonly pais: CodigoPais;
}

interface IFiltroPais {
  readonly codigo: CodigoPais | 'TODAS';
  readonly nombre: string;
}

/** El catálogo del servicio: las 22 plantillas de `examples/schemas/` en el backend. */
const CATALOGO: readonly IPlantilla[] = [
  { nombre: 'Factura electrónica de venta (DIAN)', grupo: 'Facturación y pagos', pais: 'CO' },
  { nombre: 'Cuenta de cobro', grupo: 'Facturación y pagos', pais: 'CO' },
  { nombre: 'Orden de compra', grupo: 'Facturación y pagos', pais: 'INT' },
  { nombre: 'Recibo de caja', grupo: 'Facturación y pagos', pais: 'INT' },
  { nombre: 'RUT', grupo: 'Tributario y bancos', pais: 'CO' },
  { nombre: 'Certificado de retención en la fuente', grupo: 'Tributario y bancos', pais: 'CO' },
  { nombre: 'Referencia bancaria', grupo: 'Tributario y bancos', pais: 'CO' },
  { nombre: 'Extracto bancario', grupo: 'Tributario y bancos', pais: 'INT' },
  { nombre: 'Certificado de cámara de comercio', grupo: 'Empresas y personas', pais: 'CO' },
  { nombre: 'Documento de identidad', grupo: 'Empresas y personas', pais: 'CO' },
  { nombre: 'Estados financieros', grupo: 'Empresas y personas', pais: 'CO' },
  { nombre: 'Contrato', grupo: 'Empresas y personas', pais: 'INT' },
  { nombre: 'Documento de transporte (guía o remesa)', grupo: 'Logística y comercio exterior', pais: 'CO' },
  { nombre: 'Registro de importación (VUCE)', grupo: 'Logística y comercio exterior', pais: 'CO' },
  { nombre: 'Declaración de importación (DIAN)', grupo: 'Logística y comercio exterior', pais: 'CO' },
  { nombre: 'Factura comercial de importación', grupo: 'Logística y comercio exterior', pais: 'INT' },
  { nombre: 'Conocimiento de embarque (B/L, AWB)', grupo: 'Logística y comercio exterior', pais: 'INT' },
  { nombre: 'Lista de empaque', grupo: 'Logística y comercio exterior', pais: 'INT' },
  { nombre: 'Certificado de origen', grupo: 'Logística y comercio exterior', pais: 'INT' },
  { nombre: 'Factura del agente de carga', grupo: 'Logística y comercio exterior', pais: 'INT' },
  { nombre: 'Declaración aduanera de importación (SENAE)', grupo: 'Logística y comercio exterior', pais: 'EC' },
  { nombre: 'Pedimento de importación', grupo: 'Logística y comercio exterior', pais: 'MX' },
];

@Component({
  selector: 'app-plantillas',
  imports: [Revelar],
  templateUrl: './plantillas.html',
  styleUrl: './plantillas.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Plantillas {
  protected readonly total = CATALOGO.length;

  protected readonly filtros: readonly IFiltroPais[] = [
    { codigo: 'TODAS', nombre: 'Todas' },
    { codigo: 'CO', nombre: 'Colombia' },
    { codigo: 'EC', nombre: 'Ecuador' },
    { codigo: 'MX', nombre: 'México' },
  ];

  protected readonly paisSeleccionado = signal<IFiltroPais['codigo']>('TODAS');

  /**
   * Las internacionales se muestran siempre, se filtre el país que se filtre: una factura comercial o
   * un B/L son iguales en todas partes. Es la misma regla que aplica la galería del panel.
   */
  protected readonly grupos = computed(() => {
    const pais = this.paisSeleccionado();
    const visibles = CATALOGO.filter((p) => pais === 'TODAS' || p.pais === pais || p.pais === 'INT');
    const porGrupo = new Map<string, IPlantilla[]>();
    for (const plantilla of visibles) {
      porGrupo.set(plantilla.grupo, [...(porGrupo.get(plantilla.grupo) ?? []), plantilla]);
    }
    return [...porGrupo].map(([nombre, plantillas]) => ({ nombre, plantillas }));
  });

  protected seleccionar(codigo: IFiltroPais['codigo']): void {
    this.paisSeleccionado.set(codigo);
  }
}
