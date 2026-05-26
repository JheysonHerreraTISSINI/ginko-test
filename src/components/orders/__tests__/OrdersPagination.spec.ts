import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import OrdersPagination from '../OrdersPagination.vue'

describe('OrdersPagination', () => {
  it('renderiza el-pagination de Element Plus', () => {
    const wrapper = mount(OrdersPagination, {
      props: {
        currentPage: 1,
        pageSize: 5,
        total: 12,
        rangeLabel: '1–5 de 12',
      },
    })

    expect(wrapper.find('.el-pagination').exists()).toBe(true)
    expect(wrapper.text()).toContain('1–5 de 12')
  })
})
