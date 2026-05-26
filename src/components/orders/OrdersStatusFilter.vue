<script setup lang="ts">
import type { StatusFilter } from '@/types/payment-order'

const statusFilter = defineModel<StatusFilter>('statusFilter', { required: true })

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'BORRADOR', label: 'Borrador' },
  { value: 'APROBADA', label: 'Aprobada' },
  { value: 'RECHAZADA', label: 'Rechazada' },
  { value: 'PAGADA', label: 'Pagada' },
]
</script>

<template>
  <div class="status-filter">
    <span class="status-filter__label">Estado</span>
    <el-select v-model="statusFilter" placeholder="Seleccionar estado" class="status-filter__select">
      <el-option
        v-for="option in statusOptions"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </el-select>
  </div>
</template>

<style scoped>
.status-filter {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.status-filter__label {
  font-size: 0.875rem;
  font-weight: 500;
}

.status-filter__select {
  max-width: 14rem;
}
</style>
