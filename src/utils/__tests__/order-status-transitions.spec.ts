import { describe, expect, it } from 'vitest'
import {
  canTransitionTo,
  getAllowedTransitions,
  transitionConfirmMessage,
} from '../order-status-transitions'

describe('order-status-transitions', () => {
  it('permite BORRADOR → APROBADA o RECHAZADA', () => {
    expect(canTransitionTo('BORRADOR', 'APROBADA')).toBe(true)
    expect(canTransitionTo('BORRADOR', 'RECHAZADA')).toBe(true)
    expect(canTransitionTo('BORRADOR', 'PAGADA')).toBe(false)
  })

  it('permite APROBADA → PAGADA', () => {
    expect(canTransitionTo('APROBADA', 'PAGADA')).toBe(true)
    expect(canTransitionTo('APROBADA', 'RECHAZADA')).toBe(false)
  })

  it('no permite transiciones desde RECHAZADA ni PAGADA', () => {
    expect(getAllowedTransitions('RECHAZADA')).toEqual([])
    expect(getAllowedTransitions('PAGADA')).toEqual([])
  })

  it('devuelve acciones con etiqueta para BORRADOR', () => {
    const actions = getAllowedTransitions('BORRADOR')
    expect(actions).toHaveLength(2)
    expect(actions.map((a) => a.label)).toEqual(['Aprobar orden', 'Rechazar orden'])
  })

  it('devuelve acción de pago para APROBADA', () => {
    const actions = getAllowedTransitions('APROBADA')
    expect(actions).toHaveLength(1)
    expect(actions[0]?.label).toBe('Marcar como pagada')
  })

  it('arma mensaje de confirmación según destino', () => {
    expect(transitionConfirmMessage('APROBADA', 'Acme SAS')).toContain('aprobar')
    expect(transitionConfirmMessage('RECHAZADA', 'Acme SAS')).toContain('rechazar')
    expect(transitionConfirmMessage('PAGADA', 'Acme SAS')).toContain('pagada')
  })
})
