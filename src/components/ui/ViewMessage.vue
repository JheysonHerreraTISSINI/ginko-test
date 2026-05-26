<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  variant: 'loading' | 'error' | 'empty'
}>()
</script>

<template>
  <div class="view-message-wrap" role="status">
    <div
      v-if="variant === 'loading'"
      v-loading="true"
      class="view-message view-message--loading"
      :element-loading-text="title"
    >
      <p v-if="description" class="view-message__hint">{{ description }}</p>
    </div>

    <template v-else-if="variant === 'error'">
      <el-alert
        :title="title"
        type="error"
        :description="description"
        show-icon
        :closable="false"
        class="view-message-alert"
      />
      <div v-if="$slots.default" class="view-message__actions">
        <slot />
      </div>
    </template>

    <el-empty v-else-if="variant === 'empty'" class="view-message-empty">
      <template #description>
        <p class="view-message__title">{{ title }}</p>
        <p v-if="description" class="view-message__description">{{ description }}</p>
      </template>
    </el-empty>
  </div>
</template>

<style scoped>
.view-message-wrap {
  margin: 1.5rem auto;
  max-width: 32rem;
}

.view-message--loading {
  min-height: 10rem;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border-radius: 0.5rem;
}

.view-message__hint {
  margin: 0;
  padding-bottom: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
  z-index: 1;
}

.view-message-alert {
  margin-bottom: 0;
}

.view-message__actions {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.view-message-empty :deep(.el-empty__description p) {
  margin: 0;
}

.view-message__title {
  margin: 0 0 0.35rem;
  font-weight: 600;
  font-size: 1rem;
  color: #374151;
}

.view-message__description {
  margin: 0;
  font-size: 0.9rem;
  color: #6b7280;
}
</style>
