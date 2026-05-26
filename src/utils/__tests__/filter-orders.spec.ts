import { describe, expect, it } from 'vitest'
import { filterOrders } from '../filter-orders'
import type { PaymentOrder } from '@/types/payment-order'

const sample: PaymentOrder[] = [
  {
    id: '1',
    proveedor: 'Logística Andina',
    monto: 100,
    concepto: 'A',
    fechaCreacion: '2026-05-01',
    estado: 'BORRADOR',
  },
  {
    id: '2',
    proveedor: 'Papelera Central',
    monto: 200,
    concepto: 'B',
    fechaCreacion: '2026-05-02',
    estado: 'APROBADA',
  },
]

describe('filterOrders', () => {
  it('combina estado y búsqueda con AND', () => {
    const result = filterOrders(sample, 'APROBADA', 'papelera')
    expect(result).toHaveLength(1)
    expect(result[0]?.id).toBe('2')
  })

  it('devuelve todos cuando los filtros están vacíos', () => {
    expect(filterOrders(sample, 'todos', '')).toHaveLength(2)
  })
})
