<script setup lang="ts">
import type { StatusFilter } from '@/types/payment-order'

const statusFilter = defineModel<StatusFilter>('statusFilter', { required: true })
</script>

<template>
  <div class="status-filter">
    <label class="status-filter__field">
      <span>Estado</span>
      <select v-model="statusFilter">
        <option value="todos">Todos</option>
        <option value="BORRADOR">Borrador</option>
        <option value="APROBADA">Aprobada</option>
        <option value="RECHAZADA">Rechazada</option>
        <option value="PAGADA">Pagada</option>
      </select>
    </label>
  </div>
</template>

<style scoped>
.status-filter {
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.status-filter__field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.875rem;
}

.status-filter__field span {
  font-weight: 500;
}

.status-filter__field select {
  padding: 0.5rem 0.65rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  max-width: 14rem;
}
</style>
