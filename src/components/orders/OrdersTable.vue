<script setup lang="ts">
import type { PaymentOrder } from '@/types/payment-order'
import { formatCOP, formatDate } from '@/utils/format'
import StatusBadge from './StatusBadge.vue'

defineProps<{
  orders: PaymentOrder[]
}>()
</script>

<template>
  <el-table :data="orders" stripe class="orders-table">
    <el-table-column prop="id" label="ID" width="110" />
    <el-table-column prop="proveedor" label="Proveedor" min-width="160" />
    <el-table-column label="Monto" min-width="130">
      <template #default="{ row }">
        {{ formatCOP(row.monto) }}
      </template>
    </el-table-column>
    <el-table-column prop="concepto" label="Concepto" min-width="200" show-overflow-tooltip />
    <el-table-column label="Fecha" min-width="120">
      <template #default="{ row }">
        {{ formatDate(row.fechaCreacion) }}
      </template>
    </el-table-column>
    <el-table-column label="Estado" width="130">
      <template #default="{ row }">
        <StatusBadge :status="row.estado" />
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
.orders-table {
  width: 100%;
}
</style>
