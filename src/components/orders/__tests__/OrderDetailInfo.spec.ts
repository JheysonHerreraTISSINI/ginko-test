import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import OrderDetailInfo from '../OrderDetailInfo.vue'
import type { PaymentOrder } from '@/types/payment-order'

const order: PaymentOrder = {
  id: 'ord-001',
  proveedor: 'Proveedor Test',
  monto: 150000,
  concepto: 'Pago de prueba',
  fechaCreacion: '2026-05-20T10:00:00.000Z',
  estado: 'BORRADOR',
}

describe('OrderDetailInfo', () => {
  it('muestra todos los atributos de la orden', () => {
    const wrapper = mount(OrderDetailInfo, { props: { order } })

    expect(wrapper.text()).toContain('ord-001')
    expect(wrapper.text()).toContain('Proveedor Test')
    expect(wrapper.text()).toContain('Pago de prueba')
    expect(wrapper.text()).toContain('Borrador')
  })
})
