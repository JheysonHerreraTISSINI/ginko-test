<script setup lang="ts">
const searchQuery = defineModel<string>('searchQuery', { required: true })
</script>

<template>
  <div class="search-filter">
    <span class="search-filter__label">Proveedor</span>
    <el-input
      v-model="searchQuery"
      placeholder="Buscar por nombre..."
      clearable
      class="search-filter__input"
    />
  </div>
</template>

<style scoped>
.search-filter {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
  min-width: 0;
}

.search-filter__label {
  font-size: 0.875rem;
  font-weight: 500;
}

.search-filter :deep(.el-input) {
  width: 100%;
}
</style>
