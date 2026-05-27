import { describe, expect, it } from 'vitest'
import { isCreateOrderFormValid } from '../create-order-rules'

describe('isCreateOrderFormValid', () => {
  it('es válido con datos correctos', () => {
    expect(
      isCreateOrderFormValid({
        proveedor: 'Proveedor SA',
        monto: 100000,
        concepto: 'Pago de servicios',
      }),
    ).toBe(true)
  })

  it('es inválido si falta proveedor o concepto', () => {
    expect(
      isCreateOrderFormValid({
        proveedor: '   ',
        monto: 100000,
        concepto: 'Pago',
      }),
    ).toBe(false)

    expect(
      isCreateOrderFormValid({
        proveedor: 'Proveedor SA',
        monto: 100000,
        concepto: '',
      }),
    ).toBe(false)
  })

  it('es inválido si el monto es null, cero o negativo', () => {
    expect(
      isCreateOrderFormValid({
        proveedor: 'Proveedor SA',
        monto: null,
        concepto: 'Pago',
      }),
    ).toBe(false)

    expect(
      isCreateOrderFormValid({
        proveedor: 'Proveedor SA',
        monto: 0,
        concepto: 'Pago',
      }),
    ).toBe(false)
  })

  it('es inválido si el concepto supera 250 caracteres', () => {
    expect(
      isCreateOrderFormValid({
        proveedor: 'Proveedor SA',
        monto: 1000,
        concepto: 'x'.repeat(251),
      }),
    ).toBe(false)
  })
})
