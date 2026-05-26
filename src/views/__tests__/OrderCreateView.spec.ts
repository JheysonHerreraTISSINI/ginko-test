import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import OrderCreateView from '../OrderCreateView.vue'

describe('OrderCreateView', () => {
  it('muestra el formulario de creación', async () => {
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
      global: { plugins: [router] },
    })

    expect(wrapper.text()).toContain('Nueva orden de pago')
    expect(wrapper.find('.el-input').exists()).toBe(true)
    expect(wrapper.find('.el-input-number').exists()).toBe(true)
  })
})
