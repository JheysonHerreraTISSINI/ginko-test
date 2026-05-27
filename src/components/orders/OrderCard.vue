<script setup lang="ts">
import type { PaymentOrder } from '@/types/payment-order'
import { formatCOP, formatDate } from '@/utils/format'
import StatusBadge from './StatusBadge.vue'

defineProps<{
  order: PaymentOrder
}>()

const emit = defineEmits<{
  select: [orderId: string]
}>()
</script>

<template>
  <article
    class="order-card order-card--clickable"
    role="button"
    tabindex="0"
    @click="emit('select', order.id)"
    @keydown.enter="emit('select', order.id)"
  >
    <header class="order-card__header">
      <h3 class="order-card__provider">{{ order.proveedor }}</h3>
      <StatusBadge :status="order.estado" />
    </header>
    <dl class="order-card__details">
      <div class="order-card__row">
        <dt>ID</dt>
        <dd>{{ order.id }}</dd>
      </div>
      <div class="order-card__row">
        <dt>Monto</dt>
        <dd>{{ formatCOP(order.monto) }}</dd>
      </div>
      <div class="order-card__row">
        <dt>Concepto</dt>
        <dd>{{ order.concepto }}</dd>
      </div>
      <div class="order-card__row">
        <dt>Fecha</dt>
        <dd>{{ formatDate(order.fechaCreacion) }}</dd>
      </div>
    </dl>
  </article>
</template>

<style scoped>
.order-card {
  padding: 1rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.order-card--clickable {
  cursor: pointer;
  transition: border-color 0.15s ease;
}

.order-card--clickable:hover {
  border-color: #93c5fd;
}

.order-card--clickable:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.order-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.order-card__provider {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.3;
}

.order-card__details {
  margin: 0;
  display: grid;
  gap: 0.5rem;
}

.order-card__row {
  display: grid;
  grid-template-columns: 5rem 1fr;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.order-card__row dt {
  margin: 0;
  color: #6b7280;
  font-weight: 500;
}

.order-card__row dd {
  margin: 0;
  color: #1f2937;
}
</style>
