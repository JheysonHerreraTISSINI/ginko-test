import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import OrderStatusActions from '../OrderStatusActions.vue'

describe('OrderStatusActions', () => {
  it('muestra aprobar y rechazar en BORRADOR', () => {
    const wrapper = mount(OrderStatusActions, { props: { status: 'BORRADOR' } })
    const labels = wrapper.findAll('.el-button').map((b) => b.text())

    expect(labels).toEqual(['Aprobar orden', 'Rechazar orden'])
  })

  it('muestra marcar pagada en APROBADA', () => {
    const wrapper = mount(OrderStatusActions, { props: { status: 'APROBADA' } })
    expect(wrapper.text()).toContain('Marcar como pagada')
    expect(wrapper.findAll('.el-button')).toHaveLength(1)
  })

  it('no muestra acciones en PAGADA', () => {
    const wrapper = mount(OrderStatusActions, { props: { status: 'PAGADA' } })
    expect(wrapper.find('.order-status-actions').exists()).toBe(false)
  })

  it('emite transition al hacer clic', async () => {
    const wrapper = mount(OrderStatusActions, { props: { status: 'BORRADOR' } })
    await wrapper.get('.el-button').trigger('click')

    expect(wrapper.emitted('transition')?.[0]).toEqual(['APROBADA'])
  })
})
