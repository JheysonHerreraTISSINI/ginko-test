import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import OrdersStatusFilter from '../OrdersStatusFilter.vue'

describe('OrdersStatusFilter', () => {
  it('renderiza el select de Element Plus', () => {
    const wrapper = mount(OrdersStatusFilter, {
      props: {
        statusFilter: 'todos',
      },
    })

    expect(wrapper.find('.el-select').exists()).toBe(true)
  })
})
