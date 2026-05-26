<script setup lang="ts">
import { statusLabels, statusTagTypes } from '@/constants/order.constant'
import type { PaymentOrderStatus } from '@/types/payment-order'

defineProps<{
  status: PaymentOrderStatus
}>()
</script>

<template>
  <el-tag :type="statusTagTypes[status]" effect="light" round>
    {{ statusLabels[status] }}
  </el-tag>
</template>
