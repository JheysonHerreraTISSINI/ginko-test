# Órdenes de pago a proveedores — Prueba técnica Ginko

Aplicación frontend para gestionar órdenes de pago a proveedores (banca empresarial). Desarrollada como prueba take-home para Ginko Financial Solutions.

## Stack

| Herramienta | Uso |
|-------------|-----|
| Vue 3 + Composition API | UI y lógica de vistas |
| Vite | Bundler y dev server |
| TypeScript | Tipado del dominio y contratos con la API |
| Pinia | Estado global compartido (órdenes, acciones de mutación) |
| Vue Router | Navegación y sincronización de filtros en URL |
| Axios | Cliente HTTP hacia el mock |
| Vitest + Vue Test Utils | Pruebas unitarias de componentes |

### Mock de API

_Se documentará en el commit del Bloque 1 (json-server)._ La elección será **json-server** por simplicidad, archivo `db.json` versionado y scripts npm claros para correr API y frontend en paralelo.

### UI / estilos

Sin librería de componentes por ahora: **CSS propio** con variables y breakpoints (mobile / tablet / desktop). Menos dependencias y control total para la sustentación en vivo.

## Requisitos previos

- Node.js 20+
- npm 10+

## Instalación y ejecución

```bash
npm install
npm run dev
```

Abrir la URL que muestra Vite (por defecto `http://localhost:5173`).

### Pruebas

```bash
npm run test
```

## Estructura del proyecto

```
src/
  components/   # UI reutilizable (tabla, tarjetas, badges, etc.)
  views/        # Páginas por ruta
  stores/       # Pinia
  router/       # Rutas
  types/        # Modelos de dominio
  api/          # Cliente HTTP (próximo bloque)
```

## Plan de implementación (commits / bloques)

| Bloque | Contenido | Estado |
|--------|-----------|--------|
| 0 | Repo, scaffold, README base | ✅ En curso |
| 1 | Mock API + listado (tabla/cards, estados, paginación) | Pendiente |
| 2 | Filtros + query params en URL | Pendiente |
| 3 | Formulario de creación | Pendiente |
| 4 | Detalle y transición de estado | Pendiente |
| 5 | Calidad transversal (tests, responsivo, documentación Pinia) | Pendiente |
| 6 | Extras opcionales | Pendiente |

## Decisiones de diseño

_Se irán completando por bloque en este README._

- **TypeScript**: reduce errores en estados de orden y reglas de transición.
- **Estado local vs Pinia**: las vistas mantienen estado de UI (filtros en formulario, modales); Pinia concentrará la lista de órdenes y operaciones que varias rutas consumen. Detalle en bloque 5.

## Pendientes

Nada aún — proyecto recién inicializado.

## Autor

Prueba técnica individual — [tu nombre / usuario GitHub].
