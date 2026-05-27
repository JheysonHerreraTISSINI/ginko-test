import { describe, expect, it } from 'vitest'
import { MAX_CONCEPT_LENGTH } from '@/constants/order.constant'

describe('validaciones crear orden', () => {
  it('define máximo de 250 caracteres para concepto', () => {
    expect(MAX_CONCEPT_LENGTH).toBe(250)
  })
})
