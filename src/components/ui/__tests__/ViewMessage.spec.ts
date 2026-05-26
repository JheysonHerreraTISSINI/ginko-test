import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ViewMessage from '../ViewMessage.vue'

describe('ViewMessage', () => {
  it('muestra overlay de carga con v-loading', () => {
    const wrapper = mount(ViewMessage, {
      props: {
        variant: 'loading',
        title: 'Cargando órdenes...',
        description: 'Espere un momento',
      },
    })

    expect(wrapper.find('.view-message--loading').exists()).toBe(true)
    expect(wrapper.text()).toContain('Espere un momento')
  })

  it('muestra el-alert en estado de error', () => {
    const wrapper = mount(ViewMessage, {
      props: {
        variant: 'error',
        title: 'Error al cargar',
        description: 'Detalle del error',
      },
    })

    expect(wrapper.find('.el-alert').exists()).toBe(true)
    expect(wrapper.text()).toContain('Error al cargar')
  })

  it('muestra el-empty en estado vacío', () => {
    const wrapper = mount(ViewMessage, {
      props: {
        variant: 'empty',
        title: 'No hay órdenes',
        description: 'Crea una nueva',
      },
    })

    expect(wrapper.find('.el-empty').exists()).toBe(true)
    expect(wrapper.text()).toContain('No hay órdenes')
  })
})
