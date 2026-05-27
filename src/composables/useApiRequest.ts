import { ref } from 'vue'
import { getApiErrorMessage } from '@/utils/order-status-transitions'

export interface ApiRequestExecuteOptions {
  errorFallback?: string
  throwOnError?: boolean
}

export function useApiRequest(defaultErrorFallback: string) {
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function execute<T>(
    task: () => Promise<T>,
    options?: ApiRequestExecuteOptions,
  ): Promise<T | undefined> {
    loading.value = true
    error.value = null

    try {
      return await task()
    } catch (err) {
      error.value = getApiErrorMessage(
        err,
        options?.errorFallback ?? defaultErrorFallback,
      )
      if (options?.throwOnError) {
        throw err
      }
      return undefined
    } finally {
      loading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  return {
    loading,
    error,
    execute,
    clearError,
  }
}
