import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import OrdersSearchFilter from '../OrdersSearchFilter.vue'

describe('OrdersSearchFilter', () => {
  it('renderiza el-input de Element Plus', () => {
    const wrapper = mount(OrdersSearchFilter, {
      props: {
        searchQuery: '',
      },
    })

    expect(wrapper.find('.el-input').exists()).toBe(true)
    expect(wrapper.find('input').attributes('placeholder')).toBe('Buscar por nombre...')
  })
})
