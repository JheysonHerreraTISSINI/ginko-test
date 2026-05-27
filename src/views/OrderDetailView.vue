<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { storeToRefs } from 'pinia'
import OrderDetailInfo from '@/components/orders/OrderDetailInfo.vue'
import OrderStatusActions from '@/components/orders/OrderStatusActions.vue'
import ViewMessage from '@/components/ui/ViewMessage.vue'
import { usePaymentOrdersStore } from '@/stores/payment-orders'
import {
  transitionConfirmMessage,
  transitionSuccessMessage,
  type TransitionTargetStatus,
} from '@/utils/order-status-transitions'

const route = useRoute()
const store = usePaymentOrdersStore()
const { orders, loading } = storeToRefs(store)

const orderId = computed(() => String(route.params.id))

const order = computed(() => store.getOrderById(orderId.value))

const showLoading = computed(() => loading.value && !order.value)
const showNotFound = computed(() => !loading.value && !order.value)
const isTransitioning = ref(false)

async function handleTransition(targetStatus: TransitionTargetStatus) {
  if (!order.value) return

  try {
    await ElMessageBox.confirm(
      transitionConfirmMessage(targetStatus, order.value.proveedor),
      'Confirmar cambio de estado',
      {
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        type: 'warning',
      },
    )
  } catch {
    return
  }

  isTransitioning.value = true
  try {
    await store.transitionOrder(orderId.value, targetStatus)
    ElMessage.success(transitionSuccessMessage(targetStatus))
  } catch {
    ElMessage.error('No pudimos actualizar el estado. Intenta de nuevo.')
  } finally {
    isTransitioning.value = false
  }
}

onMounted(async () => {
  if (!order.value && orders.value.length === 0) {
    await store.loadOrders()
  }
})
</script>

<template>
  <section class="order-detail">
    <header class="order-detail__header">
      <RouterLink :to="{ name: 'orders-list' }">
        <el-button type="primary">← Volver al listado</el-button>
      </RouterLink>
      <h1>Detalle de orden</h1>
      <p v-if="order" class="order-detail__subtitle">{{ order.proveedor }}</p>
    </header>

    <ViewMessage
      v-if="showLoading"
      variant="loading"
      title="Cargando orden..."
      description="Estamos obteniendo la información del servidor."
    />

    <ViewMessage
      v-else-if="showNotFound"
      variant="empty"
      title="Orden no encontrada"
      description="No existe una orden con ese identificador en el listado actual."
    />

    <template v-else-if="order">
      <OrderDetailInfo :order="order" />
      <OrderStatusActions
        :status="order.estado"
        :disabled="isTransitioning"
        @transition="handleTransition"
      />
    </template>
  </section>
</template>

<style scoped>
.order-detail {
  padding: 1.25rem 1rem;
  max-width: 40rem;
  margin: 0 auto;
}

.order-detail__header {
  margin-bottom: 1.25rem;
}

.order-detail__header h1 {
  margin: 0.5rem 0 0;
  font-size: 1.5rem;
}

.order-detail__subtitle {
  margin: 0.25rem 0 0;
  color: #6b7280;
  font-size: 0.95rem;
}
</style>
