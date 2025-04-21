# Kubo Backend (Google Apps Script)

Este backend expone una API REST para gestionar mesas y enlaces para el sistema Kubo. No contiene ningún recurso de frontend ni archivos de presentación.

## Endpoints disponibles

- **GET /?endpoint=mesas**
  - Devuelve la lista de mesas en formato JSON.
  - Ejemplo:
    `https://script.google.com/macros/s/TU_DEPLOYMENT_ID/exec?endpoint=mesas`

- **GET /?endpoint=enlaces&mesa=ID**
  - Devuelve los enlaces asociados a una mesa específica en formato JSON.
  - Ejemplo:
    `https://script.google.com/macros/s/TU_DEPLOYMENT_ID/exec?endpoint=enlaces&mesa=1`

## Estructura del proyecto

- `app.js`             → Punto de entrada (doGet)
- `routers/`           → Definición de endpoints y rutas
- `controllers/`       → Lógica de negocio y respuestas API
- `models/`            → Acceso y manipulación de datos (Google Sheets)
- `core/Utils.js`      → Utilidades generales

## Despliegue

1. Vincula este proyecto a tu Google Apps Script.
2. Despliega como "Aplicación web" con acceso "Cualquiera, incluso anónimo".
3. Usa la URL de despliegue para consumir la API desde tu frontend Astro.

---

> Si necesitas agregar nuevos endpoints, hazlo en `routers/Router.gs.js` y sigue la estructura modular del proyecto.
