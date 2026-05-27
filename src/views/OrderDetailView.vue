<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { usePaymentOrdersStore } from '@/stores/payment-orders'

const route = useRoute()
const store = usePaymentOrdersStore()
const { orders, loading } = storeToRefs(store)

const orderId = computed(() => String(route.params.id))

const order = computed(() =>
  store.getOrderById(orderId.value),
)

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
      <p v-if="order" class="order-detail__id">{{ order.id }}</p>
      <p v-else-if="loading" class="order-detail__hint">Cargando orden...</p>
      <p v-else class="order-detail__hint">Orden no encontrada.</p>
    </header>
  </section>
</template>

<style scoped>
.order-detail {
  padding: 1.25rem 1rem;
  max-width: 40rem;
  margin: 0 auto;
}

.order-detail__header h1 {
  margin: 0.5rem 0 0;
  font-size: 1.5rem;
}

.order-detail__id {
  margin: 0.25rem 0 0;
  color: #6b7280;
  font-size: 0.9rem;
}

.order-detail__hint {
  margin: 0.25rem 0 0;
  color: #6b7280;
  font-size: 0.9rem;
}
</style>
