<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import OrderDetailInfo from '@/components/orders/OrderDetailInfo.vue'
import ViewMessage from '@/components/ui/ViewMessage.vue'
import { usePaymentOrdersStore } from '@/stores/payment-orders'

const route = useRoute()
const store = usePaymentOrdersStore()
const { orders, loading } = storeToRefs(store)

const orderId = computed(() => String(route.params.id))

const order = computed(() => store.getOrderById(orderId.value))

const showLoading = computed(() => loading.value && !order.value)
const showNotFound = computed(() => !loading.value && !order.value)

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

    <OrderDetailInfo v-else-if="order" :order="order" />
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
