# Órdenes de pago a proveedores — Prueba técnica Ginko

Aplicación frontend para gestionar **órdenes de pago a proveedores** (contexto banca empresarial). Permite listar, filtrar, crear órdenes y cambiar su estado según reglas de negocio. Prueba take-home para **Ginko Financial Solutions**.

**Repositorio:** https://github.com/JheysonHerreraTISSINI/ginko-test

## Requisitos previos

- Node.js 20+
- npm 10+

## Instalación y ejecución

```bash
git clone https://github.com/JheysonHerreraTISSINI/ginko-test.git
cd ginko-test
npm install
```

Copia variables de entorno (opcional; por defecto ya apunta al mock local):

```bash
cp .env.example .env.development
```

**Opción recomendada** — API mock + frontend:

```bash
npm run dev:all
```

**Opción manual** — dos terminales:

```bash
# Terminal 1 — json-server (mock API)
npm run api

# Terminal 2 — Vite
npm run dev
```

- Frontend: http://localhost:5173  
- API mock: http://localhost:3000 (`GET/POST/PATCH /ordenes`)

### Pruebas automatizadas

```bash
npm run test
```

Build de producción:

```bash
npm run build
```

## Stack

| Herramienta | Uso |
|-------------|-----|
| Vue 3 + Composition API | UI y lógica de vistas |
| Vite | Bundler y dev server |
| TypeScript | Tipado del dominio |
| Pinia | Estado global (órdenes, mutaciones) |
| Vue Router | Rutas y query params de filtros |
| Axios | Cliente HTTP |
| Vitest + Vue Test Utils | Pruebas unitarias |
| Element Plus | Componentes UI (tabla, formulario, tags, alertas) |
| json-server | Mock REST (`db.json`) |

## Funcionalidades implementadas (enunciado)

| Bloque | Requisitos | Estado |
|--------|------------|--------|
| 1 | Listado API, tabla/cards, badges, loading/error/vacío, paginación cliente | ✅ |
| 2 | Filtro estado + búsqueda proveedor, AND, persistencia en URL | ✅ |
| 3 | Crear orden, validaciones, errores por campo, botón deshabilitado, redirect + toast | ✅ |
| 4 | Detalle, transiciones (BORRADOR→APROBADA/RECHAZADA, APROBADA→PAGADA), confirmación, error API | ✅ |
| 5 | Componentes acotados, Pinia vs local documentado, responsivo 3 breakpoints, tests | ✅ |
| 6 | Extras opcionales | Parcial (ver abajo) |

### Rutas

| Ruta | Vista |
|------|--------|
| `/` | Listado de órdenes |
| `/ordenes/nueva` | Crear orden |
| `/ordenes/:id` | Detalle y cambio de estado |

Ejemplo con filtros en URL: `/?estado=BORRADOR&busqueda=logística`

## Mock de API

**json-server** (`db.json`) expone `/ordenes`. Se eligió por setup mínimo y CRUD realista para la prueba.

- `GET /ordenes` — listado  
- `POST /ordenes` — crear (el mock puede generar `id` aleatorio; la UI usa la respuesta del servidor)  
- `PATCH /ordenes/:id` — actualizar `estado`

## UI — Element Plus

Documentado en evaluación: tabla, select, formulario, tags y mensajes encajan con el enunciado sin armar todo desde cero. Auto-import con `ElementPlusResolver` en `vite.config.ts`.

## Estructura del proyecto

```
src/
  api/           # Axios + funciones por recurso
  components/    # UI (órdenes, ViewMessage)
  composables/   # Paginación, filtros URL, useApiRequest
  constants/     # Paginación, estados, validación
  stores/        # Pinia payment-orders
  types/         # Modelos TypeScript
  utils/         # Filtros, transiciones, formato (lógica pura)
  views/         # Páginas por ruta
db.json          # Datos mock
```

## Decisiones de diseño

### TypeScript y dominio

Tipos en `src/types/payment-order.ts`. Reglas de transición y filtros en `utils/` (sin Vue) para testear y explicar en entrevista.

### Paginación del lado del cliente

12 órdenes mock, 5 por página (`useClientPagination`). Evita paginación en json-server; el filtrado ocurre antes de paginar.

### Filtros en URL

Query params `estado` y `busqueda`, sincronizados con `useOrderFilters`. Lógica AND en `filterOrders`.

### Estado local vs Pinia

**Pinia:** `orders`, carga inicial (`loading`/`error`), `loadOrders`, `createOrder`, `transitionOrder` (con actualización optimista).

**Local:** página de paginación, filtros en composable + URL, formulario de creación, error de transición en detalle (`transitionError`, `isTransitioning`).

Criterio: si varias rutas comparten datos → Pinia; si es UI de una pantalla → local.

### Responsivo (mobile / tablet / desktop)

Breakpoints en `src/style.css`: &lt;768px mobile (cards), ≥768px tablet (tabla), ≥1024px desktop (tipografía y espaciado).

### Carga de API unificada (extra 6.1)

`useApiRequest` centraliza `loading`/`error` en `loadOrders`.

### Transición optimista (extra 6.2)

`transitionOrder` actualiza el estado en Pinia al instante y revierte si falla el `PATCH`.

## Pruebas

Más de **dos componentes** exigidos por el enunciado: **18 archivos** de test, **55 casos** (vistas, componentes, store, utils, composables).

## Verificación manual sugerida

1. `npm run dev:all` → listado carga.  
2. Filtro por estado + búsqueda; recargar URL y comprobar que persisten.  
3. **Nueva orden** → validaciones → crear → toast y orden en listado.  
4. Clic en orden → detalle completo.  
5. **Aprobar** / **Rechazar** (BORRADOR) o **Marcar pagada** (APROBADA) con diálogo de confirmación.  
6. Detener `npm run api` y confirmar transición → mensaje de error; estado no cambia.  
7. Redimensionar ventana: cards (móvil) vs tabla (≥768px).

## Capturas (opcional)

Puedes añadir en `docs/screenshots/` imágenes del listado (desktop/mobile), formulario y detalle, y enlazarlas aquí antes de enviar el correo.

## Pendientes

Lo siguiente **no se implementó** de forma deliberada (prioridad al bloque obligatorio 1–5 y tiempo de la prueba):

| Ítem | Motivo |
|------|--------|
| Atajos de teclado (bloque 6) | Opcional; se priorizó claridad de flujo y tests de negocio |
| Modo oscuro (bloque 6) | Opcional; fuera de alcance |
| Animaciones en listado al cambiar estado (bloque 6) | Opcional; el cambio ya es visible vía optimistic update + badge |
| IDs consecutivos `ord-XXX` en POST | json-server v1 beta genera ids aleatorios; se acepta la respuesta del mock |
| Reintento dedicado tras error de transición | El usuario puede volver a usar la acción; sin botón “Reintentar” |
| Auth, roles, edición de órdenes | Fuera del enunciado |

**Implementado del bloque 6 (opcional):** composable `useApiRequest` (6.1) y optimistic update en transición (6.2).

## Autor

Prueba técnica individual — [JheysonHerreraTISSINI](https://github.com/JheysonHerreraTISSINI).
