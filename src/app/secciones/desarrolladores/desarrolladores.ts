import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Revelar } from '../../compartido/revelar';
import { SITIO } from '../../configuracion/sitio';

type Lenguaje = 'curl' | 'python' | 'javascript';

interface IPestana {
  readonly lenguaje: Lenguaje;
  readonly nombre: string;
}

/** Los mismos ejemplos que la documentación de la API (`app/api_docs/code_samples.py` del backend). */
const EJEMPLOS: Record<Lenguaje, string> = {
  curl: `curl -X POST "${SITIO.urlApi}/api/v1/pdf/extract" \\
  -H "X-API-Key: $LECTOR_PDF_API_KEY" \\
  -F "file=@factura.pdf" \\
  -F "template=factura_electronica_dian"`,
  python: `import os, requests

with open("factura.pdf", "rb") as pdf:
    resp = requests.post(
        "${SITIO.urlApi}/api/v1/pdf/extract",
        headers={"X-API-Key": os.environ["LECTOR_PDF_API_KEY"]},
        files={"file": ("factura.pdf", pdf, "application/pdf")},
        data={"template": "factura_electronica_dian"},
        timeout=180,
    )

print(resp.json()["data"])`,
  javascript: `import { readFile } from "node:fs/promises";

const form = new FormData();
form.append("file", new Blob([await readFile("factura.pdf")]), "factura.pdf");
form.append("template", "factura_electronica_dian");

const resp = await fetch("${SITIO.urlApi}/api/v1/pdf/extract", {
  method: "POST",
  headers: { "X-API-Key": process.env.LECTOR_PDF_API_KEY },
  body: form,
});

console.log((await resp.json()).data);`,
};

@Component({
  selector: 'app-desarrolladores',
  imports: [Revelar],
  templateUrl: './desarrolladores.html',
  styleUrl: './desarrolladores.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Desarrolladores {
  protected readonly sitio = SITIO;

  protected readonly pestanas: readonly IPestana[] = [
    { lenguaje: 'curl', nombre: 'cURL' },
    { lenguaje: 'python', nombre: 'Python' },
    { lenguaje: 'javascript', nombre: 'JavaScript' },
  ];

  protected readonly lenguaje = signal<Lenguaje>('curl');
  protected readonly codigo = computed(() => EJEMPLOS[this.lenguaje()]);

  protected readonly capacidades = [
    { titulo: 'Colección de Postman', texto: 'Todos los endpoints listos para importar, con la autenticación puesta.' },
    { titulo: 'Trabajos en segundo plano', texto: 'Para documentos largos: encolas, y el resultado te llega por webhook.' },
    { titulo: 'Reintentos sin cobro doble', texto: 'Con Idempotency-Key, repetir una solicitud devuelve el mismo resultado.' },
    { titulo: 'Keys de prueba', texto: 'Integra con datos de ejemplo, sin IA y sin gastar páginas de tu plan.' },
    { titulo: 'Costo antes de procesar', texto: 'Pregunta cuántas páginas va a descontar un documento antes de enviarlo.' },
    { titulo: 'Errores con código propio', texto: 'Cada fallo trae un código estable y un mensaje que explica qué hacer.' },
  ];

  protected seleccionar(lenguaje: Lenguaje): void {
    this.lenguaje.set(lenguaje);
  }
}
