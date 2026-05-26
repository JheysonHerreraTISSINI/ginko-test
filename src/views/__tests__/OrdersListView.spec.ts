import { describe, expect, it, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import OrdersListView from '../OrdersListView.vue'
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
]

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

    const wrapper = mount(OrdersListView)
    await nextTick()
    expect(wrapper.text()).toContain('Cargando órdenes')

    resolveOrders(mockOrders)
    await flushPromises()

    expect(wrapper.text()).toContain('Proveedor Test')
    expect(wrapper.text()).not.toContain('Cargando órdenes')
  })

  it('muestra mensaje de error cuando falla la API', async () => {
    vi.spyOn(paymentOrdersApi, 'fetchPaymentOrders').mockRejectedValue(new Error('fail'))

    const wrapper = mount(OrdersListView)
    await flushPromises()

    expect(wrapper.text()).toContain('No pudimos cargar las órdenes')
    expect(wrapper.find('.el-button').exists()).toBe(true)
  })
})
