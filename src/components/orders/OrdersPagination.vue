<script setup lang="ts">
defineProps<{
  currentPage: number
  totalPages: number
  rangeLabel: string
}>()

const emit = defineEmits<{
  'update:currentPage': [page: number]
}>()

function goTo(page: number) {
  emit('update:currentPage', page)
}
</script>

<template>
  <nav class="orders-pagination" aria-label="Paginación de órdenes">
    <span class="orders-pagination__range">{{ rangeLabel }}</span>
    <div class="orders-pagination__controls">
      <button
        type="button"
        class="orders-pagination__btn"
        :disabled="currentPage <= 1"
        @click="goTo(currentPage - 1)"
      >
        Anterior
      </button>
      <span class="orders-pagination__page">
        Página {{ currentPage }} de {{ totalPages }}
      </span>
      <button
        type="button"
        class="orders-pagination__btn"
        :disabled="currentPage >= totalPages"
        @click="goTo(currentPage + 1)"
      >
        Siguiente
      </button>
    </div>
  </nav>
</template>

<style scoped>
.orders-pagination {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.orders-pagination__range {
  font-size: 0.875rem;
  color: #6b7280;
}

.orders-pagination__controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.orders-pagination__page {
  font-size: 0.875rem;
  color: #374151;
}

.orders-pagination__btn {
  padding: 0.4rem 0.85rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: #fff;
  color: #374151;
  cursor: pointer;
}

.orders-pagination__btn:hover:not(:disabled) {
  background: #f9fafb;
}

.orders-pagination__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
