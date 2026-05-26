import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchPaymentOrders } from '@/api/payment-orders-api'
import type { PaymentOrder } from '@/types/payment-order'

export const usePaymentOrdersStore = defineStore('paymentOrders', () => {
  const orders = ref<PaymentOrder[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isEmpty = computed(
    () => !loading.value && !error.value && orders.value.length === 0,
  )

  async function loadOrders() {
    loading.value = true
    error.value = null

    try {
      orders.value = await fetchPaymentOrders()
    } catch {
      orders.value = []
      error.value =
        'No pudimos cargar las órdenes. Verifica que el servidor de API esté en ejecución e intenta de nuevo.'
    } finally {
      loading.value = false
    }
  }

  return {
    orders,
    loading,
    error,
    isEmpty,
    loadOrders,
  }
})
