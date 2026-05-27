<script setup lang="ts">
import type { PaymentOrder } from '@/types/payment-order'
import { formatCOP, formatDate } from '@/utils/format'
import StatusBadge from './StatusBadge.vue'

defineProps<{
  order: PaymentOrder
}>()
</script>

<template>
  <dl class="order-detail-info">
    <div class="order-detail-info__row">
      <dt>ID</dt>
      <dd>{{ order.id }}</dd>
    </div>
    <div class="order-detail-info__row">
      <dt>Proveedor</dt>
      <dd>{{ order.proveedor }}</dd>
    </div>
    <div class="order-detail-info__row">
      <dt>Monto</dt>
      <dd>{{ formatCOP(order.monto) }}</dd>
    </div>
    <div class="order-detail-info__row">
      <dt>Concepto</dt>
      <dd>{{ order.concepto }}</dd>
    </div>
    <div class="order-detail-info__row">
      <dt>Fecha de creación</dt>
      <dd>{{ formatDate(order.fechaCreacion) }}</dd>
    </div>
    <div class="order-detail-info__row">
      <dt>Estado</dt>
      <dd>
        <StatusBadge :status="order.estado" />
      </dd>
    </div>
  </dl>
</template>

<style scoped>
.order-detail-info {
  margin: 0;
  padding: 1rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  display: grid;
  gap: 0.75rem;
}

.order-detail-info__row {
  display: grid;
  gap: 0.25rem;
  font-size: 0.9rem;
}

@media (min-width: 480px) {
  .order-detail-info__row {
    grid-template-columns: 9rem 1fr;
    gap: 1rem;
    align-items: start;
  }
}

.order-detail-info__row dt {
  margin: 0;
  color: #6b7280;
  font-weight: 500;
}

.order-detail-info__row dd {
  margin: 0;
  color: #1f2937;
  line-height: 1.45;
}
</style>
