import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import StatusBadge from '../StatusBadge.vue'

describe('StatusBadge', () => {
  it('muestra etiqueta legible para cada estado', () => {
    const wrapper = mount(StatusBadge, { props: { status: 'APROBADA' } })
    expect(wrapper.text()).toBe('Aprobada')
    expect(wrapper.classes()).toContain('status-badge--aprobada')
  })

  it('aplica clase visual según estado rechazado', () => {
    const wrapper = mount(StatusBadge, { props: { status: 'RECHAZADA' } })
    expect(wrapper.classes()).toContain('status-badge--rechazada')
  })
})
