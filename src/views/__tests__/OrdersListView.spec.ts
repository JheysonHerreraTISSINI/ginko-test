import { describe, expect, it, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import OrdersListView from '../OrdersListView.vue'
import OrderDetailView from '../OrderDetailView.vue'
import * as paymentOrdersApi from '@/api/payment-orders-api'
import type { PaymentOrder } from '@/types/payment-order'

const mockOrders: PaymentOrder[] = [
  {
    id: 'ord-001',
    proveedor: 'Proveedor Test',
    monto: 100000,
    concepto: 'Concepto de prueba',
    fechaCreacion: '2026-05-20T10:00:00.000Z',
    estado: 'BORRADOR',
  },
  {
    id: 'ord-002',
    proveedor: 'Otro Proveedor',
    monto: 200000,
    concepto: 'Otro concepto',
    fechaCreacion: '2026-05-21T10:00:00.000Z',
    estado: 'APROBADA',
  },
]

async function mountWithRouter(initialPath = '/') {
  const pinia = createPinia()
  setActivePinia(pinia)

  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', name: 'orders-list', component: OrdersListView },
      { path: '/ordenes/nueva', name: 'order-create', component: { template: '<div />' } },
      { path: '/ordenes/:id', name: 'order-detail', component: OrderDetailView },
    ],
  })

  await router.push(initialPath)
  await router.isReady()

  const wrapper = mount(OrdersListView, {
    global: { plugins: [pinia, router] },
  })

  return { wrapper, router }
}

describe('OrdersListView', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.restoreAllMocks()
  })

  it('muestra estado de carga y luego el listado', async () => {
    let resolveOrders!: (value: PaymentOrder[]) => void
    vi.spyOn(paymentOrdersApi, 'fetchPaymentOrders').mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveOrders = resolve
        }),
    )

    const { wrapper } = await mountWithRouter()
    await nextTick()
    expect(wrapper.text()).toContain('Cargando órdenes')

    resolveOrders(mockOrders)
    await flushPromises()

    expect(wrapper.text()).toContain('Proveedor Test')
    expect(wrapper.text()).not.toContain('Cargando órdenes')
  })

  it('filtra por nombre de proveedor', async () => {
    vi.spyOn(paymentOrdersApi, 'fetchPaymentOrders').mockResolvedValue(mockOrders)

    const { wrapper } = await mountWithRouter()
    await flushPromises()

    const searchInput = wrapper.find('.search-filter__input input')
    await searchInput.setValue('Otro')
    await flushPromises()

    expect(wrapper.text()).toContain('Otro Proveedor')
    expect(wrapper.text()).not.toContain('Proveedor Test')
  })

  it('lee filtros desde la URL al cargar', async () => {
    vi.spyOn(paymentOrdersApi, 'fetchPaymentOrders').mockResolvedValue(mockOrders)

    const { wrapper } = await mountWithRouter('/?estado=APROBADA&busqueda=Otro')
    await flushPromises()

    expect(wrapper.text()).toContain('Otro Proveedor')
    expect(wrapper.text()).not.toContain('Proveedor Test')
  })

  it('navega al detalle al hacer clic en una fila de la tabla', async () => {
    vi.spyOn(paymentOrdersApi, 'fetchPaymentOrders').mockResolvedValue(mockOrders)

    const { wrapper, router } = await mountWithRouter()
    await flushPromises()

    const row = wrapper.findAll('.el-table__row').find((r) => r.text().includes('Proveedor Test'))
    await row?.trigger('click')
    await flushPromises()

    expect(router.currentRoute.value.name).toBe('order-detail')
    expect(router.currentRoute.value.params.id).toBe('ord-001')
  })

  it('muestra mensaje de error cuando falla la API', async () => {
    vi.spyOn(paymentOrdersApi, 'fetchPaymentOrders').mockRejectedValue(new Error('fail'))

    const { wrapper } = await mountWithRouter()
    await flushPromises()

    expect(wrapper.text()).toContain('No pudimos cargar las órdenes')
    expect(wrapper.find('.el-button').exists()).toBe(true)
  })
})
