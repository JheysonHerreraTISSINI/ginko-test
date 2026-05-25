import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '../HomeView.vue'

describe('HomeView', () => {
  it('muestra el título de la aplicación', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.text()).toContain('Órdenes de pago a proveedores')
  })
})
