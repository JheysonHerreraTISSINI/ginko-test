import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useApiRequest } from '@/composables/useApiRequest'
import {
  createPaymentOrder,
  fetchPaymentOrders,
  patchPaymentOrderStatus,
} from '@/api/payment-orders-api'
import type { CreatePaymentOrderForm } from '@/types/create-payment-order'
import type { PaymentOrder } from '@/types/payment-order'
import type { TransitionTargetStatus } from '@/utils/order-status-transitions'
import { buildPaymentOrder } from '@/utils/build-payment-order'
import { canTransitionTo } from '@/utils/order-status-transitions'

const LOAD_ORDERS_ERROR =
  'No pudimos cargar las órdenes. Verifica que el servidor de API esté en ejecución e intenta de nuevo.'

export const usePaymentOrdersStore = defineStore('paymentOrders', () => {
  const orders = ref<PaymentOrder[]>([])
  const listRequest = useApiRequest(LOAD_ORDERS_ERROR)

  const loading = computed(() => listRequest.loading.value)
  const error = computed(() => listRequest.error.value)

  const isEmpty = computed(
    () => !loading.value && !error.value && orders.value.length === 0,
  )

  async function loadOrders() {
    const data = await listRequest.execute(() => fetchPaymentOrders(), {
      errorFallback: LOAD_ORDERS_ERROR,
    })

    if (data) {
      orders.value = data
      return
    }

    orders.value = []
    listRequest.error.value = LOAD_ORDERS_ERROR
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

  async function transitionOrder(id: string, targetStatus: TransitionTargetStatus) {
    const current = getOrderById(id)
    if (!current) {
      throw new Error('Orden no encontrada')
    }
    if (!canTransitionTo(current.estado, targetStatus)) {
      throw new Error('Transición de estado no permitida')
    }

    const updated = await patchPaymentOrderStatus(id, targetStatus)
    orders.value = orders.value.map((order) =>
      order.id === id ? updated : order,
    )
    return updated
  }

  return {
    orders,
    loading,
    error,
    isEmpty,
    loadOrders,
    getOrderById,
    createOrder,
    transitionOrder,
  }
})
