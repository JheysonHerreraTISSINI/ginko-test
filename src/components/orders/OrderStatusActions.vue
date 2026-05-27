<script setup lang="ts">
import { computed } from 'vue'
import type { PaymentOrderStatus } from '@/types/payment-order'
import {
  getAllowedTransitions,
  type TransitionTargetStatus,
} from '@/utils/order-status-transitions'

const props = defineProps<{
  status: PaymentOrderStatus
  disabled?: boolean
}>()

const emit = defineEmits<{
  transition: [targetStatus: TransitionTargetStatus]
}>()

const actions = computed(() => getAllowedTransitions(props.status))
</script>

<template>
  <section v-if="actions.length" class="order-status-actions">
    <h2 class="order-status-actions__title">Cambiar estado</h2>
    <div class="order-status-actions__buttons">
      <el-button
        v-for="action in actions"
        :key="action.targetStatus"
        :type="action.buttonType"
        :disabled="disabled"
        @click="emit('transition', action.targetStatus)"
      >
        {{ action.label }}
      </el-button>
    </div>
  </section>
</template>

<style scoped>
.order-status-actions {
  margin-top: 1.25rem;
  padding: 1rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.order-status-actions__title {
  margin: 0 0 0.75rem;
  font-size: 0.95rem;
  font-weight: 600;
}

.order-status-actions__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
</style>
