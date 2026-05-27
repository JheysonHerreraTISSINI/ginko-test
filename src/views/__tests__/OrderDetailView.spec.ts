import { describe, expect, it, vi, beforeEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import OrderDetailView from '../OrderDetailView.vue'
import * as paymentOrdersApi from '@/api/payment-orders-api'
import type { PaymentOrder } from '@/types/payment-order'

const mockOrder: PaymentOrder = {
  id: 'ord-001',
  proveedor: 'Proveedor Test',
  monto: 100000,
  concepto: 'Concepto de prueba',
  fechaCreacion: '2026-05-20T10:00:00.000Z',
  estado: 'BORRADOR',
}

async function mountView(orderId = 'ord-001', preload = true) {
  const pinia = createPinia()
  setActivePinia(pinia)

  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', name: 'orders-list', component: { template: '<div />' } },
      { path: '/ordenes/:id', name: 'order-detail', component: OrderDetailView },
    ],
  })

  if (preload) {
    vi.spyOn(paymentOrdersApi, 'fetchPaymentOrders').mockResolvedValue([mockOrder])
  }

  await router.push(`/ordenes/${orderId}`)
  await router.isReady()

  const wrapper = mount(OrderDetailView, {
    global: { plugins: [pinia, router] },
  })

  if (preload) {
    await flushPromises()
  }

  return { wrapper, router, pinia }
}

describe('OrderDetailView', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('muestra el id de la orden en la vista de detalle', async () => {
    const { wrapper } = await mountView()
    expect(wrapper.text()).toContain('Detalle de orden')
    expect(wrapper.text()).toContain('ord-001')
  })

  it('vuelve al listado al pulsar Volver', async () => {
    const { wrapper, router } = await mountView()
    const backBtn = wrapper.findAll('button').find((b) => b.text().includes('Volver'))
    await backBtn?.trigger('click')
    await flushPromises()
    expect(router.currentRoute.value.name).toBe('orders-list')
  })
})
