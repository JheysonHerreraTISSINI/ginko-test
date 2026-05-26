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

**json-server** con datos en `db.json`. Expone `GET /ordenes` en `http://localhost:3000`. Se eligió por bajo setup, REST realista y facilidad para extender CRUD en bloques siguientes (crear orden, PATCH de estado).

### UI / estilos

Sin librería de componentes por ahora: **CSS propio** con variables y breakpoints (mobile / tablet / desktop). Menos dependencias y control total para la sustentación en vivo.

## Requisitos previos

- Node.js 20+
- npm 10+

## Instalación y ejecución

```bash
npm install
```

**Opción recomendada** (API + frontend en un solo comando):

```bash
npm run dev:all
```

**Opción manual** (dos terminales):

```bash
# Terminal 1 — mock API
npm run api

# Terminal 2 — frontend
npm run dev
```

Abrir `http://localhost:5173`. La API mock corre en `http://localhost:3000` (configurable con `VITE_API_URL` en `.env.development`).

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
| 0 | Repo, scaffold, README base | ✅ Hecho |
| 1 | Mock API + listado (tabla/cards, estados, paginación) | ✅ Hecho |
| 2 | Filtros + query params en URL | Pendiente |
| 3 | Formulario de creación | Pendiente |
| 4 | Detalle y transición de estado | Pendiente |
| 5 | Calidad transversal (tests, responsivo, documentación Pinia) | Pendiente |
| 6 | Extras opcionales | Pendiente |

## Decisiones de diseño

_Se irán completando por bloque en este README._

- **TypeScript**: reduce errores en estados de orden y reglas de transición.
- **Paginación del lado del cliente**: con 12 órdenes mock y página de 5 ítems, evita lógica extra en json-server; el composable `useClientPagination` se reutilizará cuando los filtros reduzcan el conjunto visible (Bloque 2).
- **Estado local vs Pinia**: Pinia guarda la lista cargada desde la API, `loading` y `error` (compartidos entre rutas). La página actual de paginación vive en la vista vía composable — es estado de UI que no necesita ser global.
- **Responsivo**: tabla desde 768px (tablet/desktop), tarjetas apiladas en mobile; breakpoint desktop 1024px para tipografía.

## Pendientes

Nada aún — proyecto recién inicializado.

## Autor

Prueba técnica individual — [JheysonHerreraTISSINI](https://github.com/JheysonHerreraTISSINI).
