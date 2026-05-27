import { describe, expect, it, vi, beforeEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { ElMessageBox } from 'element-plus'
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

  it('muestra toda la información de la orden', async () => {
    const { wrapper } = await mountView()
    const text = wrapper.text()

    expect(text).toContain('Detalle de orden')
    expect(text).toContain('Proveedor Test')
    expect(text).toContain('ord-001')
    expect(text).toContain('Concepto de prueba')
    expect(text).toContain('Borrador')
  })

  it('muestra acciones de transición según el estado actual', async () => {
    const { wrapper } = await mountView()
    expect(wrapper.text()).toContain('Aprobar orden')
    expect(wrapper.text()).toContain('Rechazar orden')
    expect(wrapper.text()).not.toContain('Marcar como pagada')
  })

  it('actualiza el estado tras confirmar en el diálogo', async () => {
    vi.spyOn(ElMessageBox, 'confirm').mockResolvedValue('confirm' as never)
    vi.spyOn(paymentOrdersApi, 'patchPaymentOrderStatus').mockResolvedValue({
      ...mockOrder,
      estado: 'APROBADA',
    })

    const { wrapper } = await mountView()
    const approveBtn = wrapper
      .findAll('button')
      .find((b) => b.text().includes('Aprobar orden'))
    await approveBtn?.trigger('click')
    await flushPromises()

    expect(ElMessageBox.confirm).toHaveBeenCalledOnce()
    expect(wrapper.text()).toContain('Aprobada')
    expect(paymentOrdersApi.patchPaymentOrderStatus).toHaveBeenCalledWith(
      'ord-001',
      'APROBADA',
    )
  })

  it('no transiciona si el usuario cancela la confirmación', async () => {
    vi.spyOn(ElMessageBox, 'confirm').mockRejectedValue('cancel')
    vi.spyOn(paymentOrdersApi, 'patchPaymentOrderStatus')

    const { wrapper } = await mountView()
    const approveBtn = wrapper
      .findAll('button')
      .find((b) => b.text().includes('Aprobar orden'))
    await approveBtn?.trigger('click')
    await flushPromises()

    expect(paymentOrdersApi.patchPaymentOrderStatus).not.toHaveBeenCalled()
    expect(wrapper.text()).toContain('Borrador')
  })

  it('muestra error y mantiene el estado si falla la API', async () => {
    vi.spyOn(ElMessageBox, 'confirm').mockResolvedValue('confirm' as never)
    vi.spyOn(paymentOrdersApi, 'patchPaymentOrderStatus').mockRejectedValue(
      new Error('API down'),
    )

    const { wrapper } = await mountView()
    const approveBtn = wrapper
      .findAll('button')
      .find((b) => b.text().includes('Aprobar orden'))
    await approveBtn?.trigger('click')
    await flushPromises()

    expect(wrapper.text()).toContain('No se pudo cambiar el estado')
    expect(wrapper.text()).toContain('API down')
    expect(wrapper.text()).toContain('Borrador')
    expect(wrapper.find('.el-alert').exists()).toBe(true)
  })

  it('muestra mensaje si la orden no existe', async () => {
    vi.spyOn(paymentOrdersApi, 'fetchPaymentOrders').mockResolvedValue([])

    const { wrapper } = await mountView('ord-999', true)
    expect(wrapper.text()).toContain('Orden no encontrada')
  })

  it('vuelve al listado al pulsar Volver', async () => {
    const { wrapper, router } = await mountView()
    const backBtn = wrapper.findAll('button').find((b) => b.text().includes('Volver'))
    await backBtn?.trigger('click')
    await flushPromises()
    expect(router.currentRoute.value.name).toBe('orders-list')
  })
})
