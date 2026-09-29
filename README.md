# Lector PDF IA · Landing

La página pública de [Lector PDF IA](https://github.com/jsagudelodev/lector-ia-backend): qué hace, cómo
funciona, el catálogo de plantillas, los planes y cómo pedir una prueba.

Angular 21 (standalone, signals, OnPush), en la misma versión que el
[panel](https://github.com/proyectosjsdev/lector-ia-frontend). Se **prerenderiza** al compilar
(`outputMode: "static"`): el resultado es HTML estático, que los buscadores leen completo y que se
publica en cualquier hosting de archivos, sin servidor.

## Uso

```bash
npm install
npm start          # desarrollo en http://localhost:4200
npm run build      # compila y prerenderiza en dist/lector-ia-landing/browser
npm test           # pruebas (Vitest)
```

## Cómo está organizado

```
src/
├── styles.scss                 # tokens del diseño (colores, espacios, tipografía) y bloques compartidos
├── index.html                  # metadatos para buscadores y redes
└── app/
    ├── app.ts                  # arma la página con las secciones, en orden
    ├── configuracion/sitio.ts  # correo, URL del panel y de la API: todo lo provisional, en un lugar
    ├── compartido/revelar.ts   # la aparición al hacer scroll
    └── secciones/              # una carpeta por sección de la página
```

**El contenido sale de lo que el producto hace hoy** (`docs/FUNCIONALIDADES.md` del backend). Si una
funcionalidad cambia allá, se revisa aquí: la página no debe prometer nada que el servicio no haga.

## Pendiente antes de publicar

En `src/app/configuracion/sitio.ts`:

- **`correoContacto`**: hoy es `hola@tu-dominio.com`. Es a donde llegan las solicitudes de prueba.
- **`urlPanel`** y **`urlDocumentacion`**: hoy son `#`.
- **`urlApi`**: la que aparece en los ejemplos de código.

Y en el resto:

- **Los precios de los planes** dicen «A consultar» hasta que se decidan (BL-47 del backend).
- **La imagen para redes** (`og:image`): falta, y sin ella el enlace compartido sale sin vista previa.
