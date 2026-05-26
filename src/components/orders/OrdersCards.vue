<script setup lang="ts">
import type { PaymentOrder } from '@/types/payment-order'
import OrderCard from './OrderCard.vue'

defineProps<{
  orders: PaymentOrder[]
}>()
</script>

<template>
  <div class="orders-cards">
    <OrderCard v-for="order in orders" :key="order.id" :order="order" />
  </div>
</template>

<style scoped>
.orders-cards {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>
