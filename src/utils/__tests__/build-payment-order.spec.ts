import { describe, expect, it } from 'vitest'
import { buildPaymentOrder } from '../build-payment-order'

describe('buildPaymentOrder', () => {
  it('genera id secuencial y estado BORRADOR', () => {
    const order = buildPaymentOrder(
      {
        proveedor: '  Proveedor X  ',
        monto: 50000,
        concepto: '  Concepto test  ',
      },
      [{ id: 'ord-012', proveedor: 'A', monto: 1, concepto: 'B', fechaCreacion: '', estado: 'PAGADA' }],
    )

    expect(order.id).toBe('ord-013')
    expect(order.proveedor).toBe('Proveedor X')
    expect(order.concepto).toBe('Concepto test')
    expect(order.estado).toBe('BORRADOR')
    expect(order.fechaCreacion).toBeTruthy()
  })
})
