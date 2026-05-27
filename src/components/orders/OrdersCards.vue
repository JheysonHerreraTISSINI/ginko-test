<script setup lang="ts">
import type { PaymentOrder } from '@/types/payment-order'
import OrderCard from './OrderCard.vue'

defineProps<{
  orders: PaymentOrder[]
}>()

const emit = defineEmits<{
  selectOrder: [orderId: string]
}>()
</script>

<template>
  <div class="orders-cards">
    <OrderCard
      v-for="order in orders"
      :key="order.id"
      :order="order"
      @select="emit('selectOrder', $event)"
    />
  </div>
</template>

<style scoped>
.orders-cards {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>
