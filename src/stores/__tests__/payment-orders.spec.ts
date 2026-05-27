import { describe, expect, it, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePaymentOrdersStore } from '../payment-orders'
import * as paymentOrdersApi from '@/api/payment-orders-api'

const createdOrder = {
  id: 'ord-099',
  proveedor: 'Nuevo Proveedor',
  monto: 150000,
  concepto: 'Orden nueva',
  fechaCreacion: '2026-05-26T12:00:00.000Z',
  estado: 'BORRADOR' as const,
}

describe('usePaymentOrdersStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.restoreAllMocks()
  })

  it('agrega la orden creada al inicio del listado sin recargar', async () => {
    vi.spyOn(paymentOrdersApi, 'fetchPaymentOrders').mockResolvedValue([])
    vi.spyOn(paymentOrdersApi, 'createPaymentOrder').mockResolvedValue(createdOrder)

    const store = usePaymentOrdersStore()
    await store.loadOrders()

    await store.createOrder({
      proveedor: 'Nuevo Proveedor',
      monto: 150000,
      concepto: 'Orden nueva',
    })

    expect(store.orders[0]).toEqual(createdOrder)
    expect(store.orders).toHaveLength(1)
  })
})
