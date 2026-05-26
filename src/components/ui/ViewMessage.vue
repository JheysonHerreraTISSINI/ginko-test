<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  variant?: 'loading' | 'error' | 'empty'
}>()
</script>

<template>
  <div class="view-message" :class="variant && `view-message--${variant}`" role="status">
    <p class="view-message__title">{{ title }}</p>
    <p v-if="description" class="view-message__description">{{ description }}</p>
    <slot />
  </div>
</template>

<style scoped>
.view-message {
  margin: 2rem auto;
  max-width: 28rem;
  padding: 1.5rem;
  text-align: center;
  border-radius: 0.5rem;
  background: #fff;
  border: 1px solid #e5e7eb;
}

.view-message--error {
  border-color: #fecaca;
  background: #fef2f2;
}

.view-message--empty {
  border-style: dashed;
}

.view-message__title {
  margin: 0;
  font-weight: 600;
  font-size: 1rem;
}

.view-message__description {
  margin: 0.5rem 0 0;
  color: #6b7280;
  font-size: 0.9rem;
}
</style>
