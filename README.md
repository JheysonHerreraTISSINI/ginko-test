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

### UI / estilos — Element Plus

**Librería elegida: [Element Plus](https://element-plus.org/)** (Vue 3).

| Opción | Por qué no la elegimos |
|--------|-------------------------|
| **Tailwind** | Es CSS utilitario, no trae tabla, select ni formularios listos; seguirías armando mucho a mano. |
| **Vuetify** | Material Design, más pesada; exige `v-app`, tokens y convenciones extra — más curva de aprendizaje. |
| **PrimeVue** | Muy completa, pero temas/configuración más verbosa para una prueba con tiempo acotado. |
| **Element Plus** | ✅ API clara (`el-table`, `el-select`, `el-form`, `el-tag`), docs buenas, mucho uso en Vue 3, fácil de leer en entrevista. |

**Por qué encaja con esta prueba:** el listado pide tabla + estados visuales + formulario con validaciones + mensajes de error — todo eso ya viene resuelto con pocos componentes. Importación bajo demanda con `unplugin-vue-components` para no inflar el bundle.

**Setup:** instalado con `ElementPlusResolver` en `vite.config.ts` (auto-import). Ver [quickstart](https://element-plus.org/en-US/guide/quickstart.html).

La lógica (Pinia, filtros, router) no cambia — solo la capa visual.

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
  api/           # Cliente Axios y funciones por recurso
  components/    # UI reutilizable (órdenes + ViewMessage)
  composables/   # Lógica de UI reutilizable (paginación, filtros URL)
  constants/     # Valores fijos (paginación, estados, validación)
  stores/        # Pinia — datos compartidos entre rutas
  types/         # Modelos TypeScript del dominio
  utils/         # Lógica pura (filtros, transiciones, formato)
  views/         # Páginas enlazadas al router
```

## Componentización (inciso 20)

Cada pieza tiene **una responsabilidad**; las vistas solo orquestan.

| Capa | Archivo | Responsabilidad |
|------|---------|-----------------|
| **Vista** | `OrdersListView` | Carga listado, filtros, paginación, layout tabla/cards |
| **Vista** | `OrderCreateView` | Formulario de alta y envío |
| **Vista** | `OrderDetailView` | Detalle, confirmación y transición de estado |
| **Orden** | `OrdersTable` / `OrderCard` | Presentar filas (desktop / mobile) |
| **Orden** | `OrdersStatusFilter` / `OrdersSearchFilter` | UI de filtros (v-model hacia la vista) |
| **Orden** | `OrdersPagination` | Paginación Element Plus |
| **Orden** | `StatusBadge` | Color y etiqueta por `estado` |
| **Orden** | `OrderDetailInfo` | Campos de solo lectura en detalle |
| **Orden** | `OrderStatusActions` | Botones permitidos según reglas de dominio |
| **UI** | `ViewMessage` | Estados loading / error / vacío reutilizables |
| **Dominio** | `utils/filter-orders`, `order-status-transitions` | Reglas sin Vue (testeables) |
| **Datos** | `stores/payment-orders` | Lista en memoria y mutaciones vía API |

## Plan de implementación (commits / bloques)

| Bloque | Contenido | Estado |
|--------|-----------|--------|
| 0 | Repo, scaffold, README base | ✅ Hecho |
| 1 | Mock API + listado (tabla/cards, estados, paginación) | ✅ Hecho |
| 2 | Filtros + query params en URL | ✅ Hecho |
| 3 | Formulario de creación | ✅ Hecho |
| 4 | Detalle y transición de estado | ✅ Hecho |
| 5 | Calidad transversal (tests, responsivo, documentación Pinia) | ✅ Hecho |
| 6 | Extras opcionales | Pendiente |

## Estado local vs Pinia (inciso 21)

**Pinia (`payment-orders`)** — datos que varias rutas necesitan y que debe persistir al navegar sin recargar:

| En Pinia | Por qué |
|----------|---------|
| `orders` | Listado compartido: listado → detalle → volver sin nuevo GET |
| `loading` / `error` (carga inicial) | Mismo mensaje de carga/error en el listado |
| `loadOrders`, `createOrder`, `transitionOrder` | Mutaciones que actualizan el array en memoria |

**Estado local (vista o composable)** — UI efímera o de una sola pantalla:

| Local | Dónde | Por qué |
|-------|-------|---------|
| Página actual de paginación | `useClientPagination` en listado | No afecta otras rutas; se resetea al filtrar |
| `statusFilter` / `searchQuery` | `useOrderFilters` + URL | Sincronizado con query params, no con otras vistas |
| Formulario de creación | `OrderCreateView` (`reactive` + `isSubmitting`) | Solo existe en `/ordenes/nueva` |
| Confirmación / error de transición | `OrderDetailView` (`transitionError`, `isTransitioning`) | Feedback de una acción puntual en detalle |
| `formRef` y validación blur | `OrderCreateView` | Detalle de Element Plus, no global |

Criterio usado: **si otro componente o ruta lo necesita sin prop drilling → Pinia; si es UI de una pantalla → local.**

## Responsivo — tres breakpoints (inciso 22)

Variables en `src/style.css`: **mobile** &lt; 768px, **tablet** ≥ 768px, **desktop** ≥ 1024px.

| Vista / pieza | Mobile | Tablet (768px+) | Desktop (1024px+) |
|---------------|--------|-----------------|-------------------|
| Listado | Tarjetas, filtros en columna | Tabla + filtros en fila | Tipografía de título mayor |
| Crear orden | Formulario ancho completo, botones wrap | Más padding | Título y formulario más amplios |
| Detalle | Acciones en columna, info en una columna | Info en dos columnas (dt/dd), acciones en fila | Contenedor más ancho, título mayor |
| Shell (`App.vue`) | Header compacto | — | Header con más aire |

## Pruebas unitarias (inciso 23)

El enunciado pide al menos **dos componentes significativos**; el proyecto incluye **18 archivos** de test (Vitest + Vue Test Utils), por ejemplo:

- **Componentes**: `StatusBadge`, `OrdersTable`, `OrderStatusActions`, `OrderDetailInfo`, `ViewMessage`, filtros, paginación
- **Vistas**: `OrdersListView`, `OrderCreateView`, `OrderDetailView`
- **Dominio / store**: `filter-orders`, `order-status-transitions`, `create-order-rules`, `payment-orders`

Ejecutar: `npm run test`

## Decisiones de diseño

- **TypeScript**: reduce errores en estados de orden y reglas de transición.
- **Paginación del lado del cliente**: con 12 órdenes mock y página de 5 ítems, evita lógica extra en json-server; el composable `useClientPagination` pagina el resultado ya filtrado.
- **Filtros en URL**: query params `estado` (omitido = todos) y `busqueda` (texto en proveedor). Ejemplo: `/?estado=BORRADOR&busqueda=logística`. La lógica AND está en `filterOrders`; la sincronización en `useOrderFilters`.

## Pendientes

- **Bloque 6 (opcional)**: composable unificado de API, optimistic updates, atajos de teclado, modo oscuro, animaciones en listado.
- **Entrega**: capturas mobile/desktop en README (opcional, suma en evaluación).
- **Fuera de alcance deliberado**: auth, roles, edición de órdenes ya creadas, backend real.

## Autor

Prueba técnica individual — [JheysonHerreraTISSINI](https://github.com/JheysonHerreraTISSINI).
