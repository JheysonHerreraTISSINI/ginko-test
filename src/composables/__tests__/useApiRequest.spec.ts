import { describe, expect, it } from 'vitest'
import { useApiRequest } from '../useApiRequest'

describe('useApiRequest', () => {
  it('expone loading durante la petición', async () => {
    const { loading, execute } = useApiRequest('Error')

    const promise = execute(async () => {
      expect(loading.value).toBe(true)
      return 'ok'
    })

    await promise
    expect(loading.value).toBe(false)
  })

  it('devuelve datos cuando la petición tiene éxito', async () => {
    const { execute, error } = useApiRequest('Error')

    const result = await execute(async () => ['orden'])

    expect(result).toEqual(['orden'])
    expect(error.value).toBeNull()
  })

  it('guarda mensaje de error y devuelve undefined si falla', async () => {
    const { execute, error } = useApiRequest('Algo falló')

    const result = await execute(async () => {
      throw new Error('API down')
    })

    expect(result).toBeUndefined()
    expect(error.value).toBe('API down')
  })

  it('relanza el error cuando throwOnError es true', async () => {
    const { execute } = useApiRequest('Algo falló')

    await expect(
      execute(async () => {
        throw new Error('falló')
      }, { throwOnError: true }),
    ).rejects.toThrow('falló')
  })
})
