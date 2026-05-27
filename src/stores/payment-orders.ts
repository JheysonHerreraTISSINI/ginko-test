import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { createPaymentOrder, fetchPaymentOrders } from '@/api/payment-orders-api'
import type { CreatePaymentOrderForm } from '@/types/create-payment-order'
import type { PaymentOrder } from '@/types/payment-order'
import { buildPaymentOrder } from '@/utils/build-payment-order'

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

  function getOrderById(id: string): PaymentOrder | undefined {
    return orders.value.find((order) => order.id === id)
  }

  async function createOrder(form: CreatePaymentOrderForm) {
    const payload = buildPaymentOrder(form, orders.value)
    const created = await createPaymentOrder(payload)
    orders.value = [created, ...orders.value]
    return created
  }

  return {
    orders,
    loading,
    error,
    isEmpty,
    loadOrders,
    getOrderById,
    createOrder,
  }
})
