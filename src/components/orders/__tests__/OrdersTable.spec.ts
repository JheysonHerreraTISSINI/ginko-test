import { describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import OrdersTable from '../OrdersTable.vue'
import type { PaymentOrder } from '@/types/payment-order'

function findTableRow(wrapper: ReturnType<typeof mount>, text: string) {
  return wrapper.findAll('.el-table__row').find((row) => row.text().includes(text))
}

const orders: PaymentOrder[] = [
  {
    id: 'ord-001',
    proveedor: 'Proveedor Test',
    monto: 150000,
    concepto: 'Pago de prueba',
    fechaCreacion: '2026-05-20T10:00:00.000Z',
    estado: 'BORRADOR',
  },
]

describe('OrdersTable', () => {
  it('renderiza tabla de Element Plus con datos', async () => {
    const wrapper = mount(OrdersTable, { props: { orders } })
    await flushPromises()
    expect(wrapper.find('.el-table').exists()).toBe(true)
    expect(wrapper.html()).toContain('Proveedor Test')
  })

  it('emite selectOrder al hacer clic en una fila', async () => {
    const wrapper = mount(OrdersTable, { props: { orders } })
    await flushPromises()

    const row = findTableRow(wrapper, 'Proveedor Test')
    await row?.trigger('click')

    expect(wrapper.emitted('selectOrder')?.[0]).toEqual(['ord-001'])
  })
})
