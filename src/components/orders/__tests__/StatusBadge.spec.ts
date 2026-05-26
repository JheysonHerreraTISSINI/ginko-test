import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import StatusBadge from '../StatusBadge.vue'

describe('StatusBadge', () => {
  it('muestra etiqueta legible con el-tag', () => {
    const wrapper = mount(StatusBadge, { props: { status: 'APROBADA' } })
    expect(wrapper.text()).toBe('Aprobada')
    expect(wrapper.find('.el-tag').exists()).toBe(true)
  })

  it('usa tipo danger para estado rechazado', () => {
    const wrapper = mount(StatusBadge, { props: { status: 'RECHAZADA' } })
    expect(wrapper.find('.el-tag--danger').exists()).toBe(true)
  })
})
