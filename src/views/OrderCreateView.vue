<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import {
  emptyCreatePaymentOrderForm,
  type CreatePaymentOrderForm,
} from '@/types/create-payment-order'

const router = useRouter()
const form = reactive<CreatePaymentOrderForm>(emptyCreatePaymentOrderForm())

function goBack() {
  router.push({ name: 'orders-list' })
}
</script>

<template>
  <section class="order-create">
    <header class="order-create__header">
      <h1>Nueva orden de pago</h1>
      <p class="order-create__subtitle">Registra un pago a proveedor</p>
    </header>

    <el-form label-position="top" class="order-create__form" @submit.prevent>
      <el-form-item label="Proveedor">
        <el-input v-model="form.proveedor" placeholder="Nombre del proveedor" />
      </el-form-item>

      <el-form-item label="Monto (COP)">
        <el-input-number
          v-model="form.monto"
          :min="0"
          :step="1000"
          controls-position="right"
          placeholder="0"
          class="order-create__amount"
        />
      </el-form-item>

      <el-form-item label="Concepto">
        <el-input
          v-model="form.concepto"
          type="textarea"
          :rows="3"
          placeholder="Describe el motivo del pago"
        />
      </el-form-item>

      <div class="order-create__actions">
        <el-button @click="goBack">Cancelar</el-button>
        <el-button type="primary">Crear orden</el-button>
      </div>
    </el-form>
  </section>
</template>

<style scoped>
.order-create {
  padding: 1.25rem 1rem;
  max-width: 32rem;
  margin: 0 auto;
}

.order-create__header {
  margin-bottom: 1.25rem;
}

.order-create__header h1 {
  margin: 0;
  font-size: 1.5rem;
}

.order-create__subtitle {
  margin: 0.25rem 0 0;
  color: #6b7280;
  font-size: 0.9rem;
}

.order-create__form {
  padding: 1rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.order-create__amount {
  width: 100%;
}

.order-create__actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
}
</style>
