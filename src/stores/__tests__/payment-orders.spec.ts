import { describe, expect, it, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePaymentOrdersStore } from '../payment-orders'
import * as paymentOrdersApi from '@/api/payment-orders-api'
import type { PaymentOrder } from '@/types/payment-order'

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

  it('transiciona el estado de una orden existente', async () => {
    const draft = { ...createdOrder, estado: 'BORRADOR' as const }
    const approved = { ...draft, estado: 'APROBADA' as const }

    vi.spyOn(paymentOrdersApi, 'fetchPaymentOrders').mockResolvedValue([draft])
    vi.spyOn(paymentOrdersApi, 'patchPaymentOrderStatus').mockResolvedValue(approved)

    const store = usePaymentOrdersStore()
    await store.loadOrders()
    await store.transitionOrder('ord-099', 'APROBADA')

    expect(store.orders[0]?.estado).toBe('APROBADA')
  })

  it('aplica el estado de forma optimista antes de que responda la API', async () => {
    const draft = { ...createdOrder, estado: 'BORRADOR' as const }
    let resolvePatch!: (value: PaymentOrder) => void

    vi.spyOn(paymentOrdersApi, 'fetchPaymentOrders').mockResolvedValue([draft])
    vi.spyOn(paymentOrdersApi, 'patchPaymentOrderStatus').mockImplementation(
      () =>
        new Promise((resolve) => {
          resolvePatch = resolve
        }),
    )

    const store = usePaymentOrdersStore()
    await store.loadOrders()

    const transitionPromise = store.transitionOrder('ord-099', 'APROBADA')
    await vi.waitFor(() => {
      expect(store.orders[0]?.estado).toBe('APROBADA')
    })

    resolvePatch({ ...draft, estado: 'APROBADA' })
    await transitionPromise

    expect(store.orders[0]?.estado).toBe('APROBADA')
  })

  it('revierte el estado optimista si falla el PATCH', async () => {
    const draft = { ...createdOrder, estado: 'BORRADOR' as const }

    vi.spyOn(paymentOrdersApi, 'fetchPaymentOrders').mockResolvedValue([draft])
    vi.spyOn(paymentOrdersApi, 'patchPaymentOrderStatus').mockRejectedValue(
      new Error('API down'),
    )

    const store = usePaymentOrdersStore()
    await store.loadOrders()

    await expect(store.transitionOrder('ord-099', 'APROBADA')).rejects.toThrow()
    expect(store.orders[0]?.estado).toBe('BORRADOR')
  })
})
