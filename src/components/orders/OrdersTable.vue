<script setup lang="ts">
import type { PaymentOrder } from '@/types/payment-order'
import { formatCOP, formatDate } from '@/utils/format'
import StatusBadge from './StatusBadge.vue'

defineProps<{
  orders: PaymentOrder[]
}>()
</script>

<template>
  <div class="orders-table-wrapper">
    <table class="orders-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Proveedor</th>
          <th>Monto</th>
          <th>Concepto</th>
          <th>Fecha</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td data-label="ID">{{ order.id }}</td>
          <td data-label="Proveedor">{{ order.proveedor }}</td>
          <td data-label="Monto">{{ formatCOP(order.monto) }}</td>
          <td data-label="Concepto">{{ order.concepto }}</td>
          <td data-label="Fecha">{{ formatDate(order.fechaCreacion) }}</td>
          <td data-label="Estado">
            <StatusBadge :status="order.estado" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.orders-table-wrapper {
  overflow-x: auto;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.orders-table th,
.orders-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #f3f4f6;
}

.orders-table th {
  background: #f9fafb;
  font-weight: 600;
  color: #374151;
  white-space: nowrap;
}

.orders-table tbody tr:hover {
  background: #f9fafb;
}

.orders-table tbody tr:last-child td {
  border-bottom: none;
}
</style>
