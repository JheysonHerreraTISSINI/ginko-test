<script setup lang="ts">
defineProps<{
  currentPage: number
  pageSize: number
  total: number
  rangeLabel: string
}>()

const emit = defineEmits<{
  'update:currentPage': [page: number]
}>()

function onPageChange(page: number) {
  emit('update:currentPage', page)
}
</script>

<template>
  <div class="orders-pagination">
    <span class="orders-pagination__range">{{ rangeLabel }}</span>
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      layout="prev, pager, next"
      background
      @current-change="onPageChange"
    />
  </div>
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
</style>
