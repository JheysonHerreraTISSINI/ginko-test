<script setup lang="ts">
import type { PaymentOrderStatus } from '@/types/payment-order'

const props = defineProps<{
  status: PaymentOrderStatus
}>()

const labels: Record<PaymentOrderStatus, string> = {
  BORRADOR: 'Borrador',
  APROBADA: 'Aprobada',
  RECHAZADA: 'Rechazada',
  PAGADA: 'Pagada',
}
</script>

<template>
  <span class="status-badge" :class="`status-badge--${props.status.toLowerCase()}`">
    {{ labels[props.status] }}
  </span>
</template>

<style scoped>
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.status-badge--borrador {
  background: #f3f4f6;
  color: #4b5563;
}

.status-badge--aprobada {
  background: #dbeafe;
  color: #1d4ed8;
}

.status-badge--rechazada {
  background: #fee2e2;
  color: #b91c1c;
}

.status-badge--pagada {
  background: #d1fae5;
  color: #047857;
}
</style>
