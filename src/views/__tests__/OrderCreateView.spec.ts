import { describe, expect, it, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import OrderCreateView from '../OrderCreateView.vue'
import { usePaymentOrdersStore } from '@/stores/payment-orders'

async function mountView() {
  const pinia = createPinia()
  setActivePinia(pinia)

  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', name: 'orders-list', component: { template: '<div />' } },
      { path: '/ordenes/nueva', name: 'order-create', component: OrderCreateView },
    ],
  })
  await router.push('/ordenes/nueva')
  await router.isReady()

  const wrapper = mount(OrderCreateView, {
    global: { plugins: [pinia, router] },
  })

  return { wrapper, router, pinia }
}

describe('OrderCreateView', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('muestra el formulario de creación', async () => {
    const { wrapper } = await mountView()

    expect(wrapper.text()).toContain('Nueva orden de pago')
    expect(wrapper.find('.el-input__count').exists()).toBe(true)
  })

  it('deshabilita crear orden si el formulario es inválido', async () => {
    const { wrapper } = await mountView()
    const submitBtn = wrapper.findAll('.el-button').find((b) => b.text() === 'Crear orden')

    expect(submitBtn?.attributes('disabled')).toBeDefined()
  })

  it('marca proveedor en error al perder foco vacío', async () => {
    const { wrapper } = await mountView()
    const input = wrapper.get('input[placeholder="Nombre del proveedor"]')

    await input.trigger('blur')
    await nextTick()
    await flushPromises()

    const proveedorItem = wrapper.findAll('.el-form-item')[0]
    expect(proveedorItem.classes()).toContain('is-error')
  })

  it('habilita crear orden cuando el formulario es válido', async () => {
    const { wrapper } = await mountView()

    await wrapper.get('input[placeholder="Nombre del proveedor"]').setValue('Proveedor SA')
    await wrapper.find('.el-input-number input').setValue('50000')
    await wrapper.find('textarea').setValue('Pago de prueba')
    await flushPromises()

    const submitBtn = wrapper.findAll('.el-button').find((b) => b.text() === 'Crear orden')
    expect(submitBtn?.attributes('disabled')).toBeUndefined()
  })

  it('crea la orden, actualiza Pinia y navega al listado', async () => {
    const createOrder = vi.fn().mockResolvedValue({
      id: 'ord-099',
      proveedor: 'Proveedor SA',
      monto: 50000,
      concepto: 'Pago de prueba',
      fechaCreacion: '2026-05-26T12:00:00.000Z',
      estado: 'BORRADOR',
    })

    const { wrapper, router, pinia } = await mountView()
    const store = usePaymentOrdersStore(pinia)
    store.createOrder = createOrder

    await wrapper.get('input[placeholder="Nombre del proveedor"]').setValue('Proveedor SA')
    await wrapper.find('.el-input-number input').setValue('50000')
    await wrapper.find('textarea').setValue('Pago de prueba')
    await flushPromises()

    const submitBtn = wrapper.findAll('.el-button').find((b) => b.text() === 'Crear orden')
    await submitBtn?.trigger('click')
    await flushPromises()

    expect(createOrder).toHaveBeenCalledOnce()
    expect(router.currentRoute.value.name).toBe('orders-list')
  })
})
