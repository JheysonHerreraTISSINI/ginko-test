<script setup lang="ts">
import { statusOptions } from '@/constants/order.constant'
import type { StatusFilter } from '@/types/payment-order'

const statusFilter = defineModel<StatusFilter>('statusFilter', { required: true })

</script>

<template>
  <div class="status-filter">
    <span class="status-filter__label">Estado</span>
    <el-select
      v-model="statusFilter"
      placeholder="Seleccionar estado"
      class="status-filter__select"
    >
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
  width: 100%;
}

.status-filter__label {
  font-size: 0.875rem;
  font-weight: 500;
}

.status-filter__select {
  width: 100%;
}

.status-filter :deep(.el-select) {
  width: 100%;
}
</style>
