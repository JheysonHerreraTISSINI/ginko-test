<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, type FormInstance } from 'element-plus'
import { MAX_CONCEPT_LENGTH } from '@/constants/order.constant'
import {
  emptyCreatePaymentOrderForm,
  type CreatePaymentOrderForm,
} from '@/types/create-payment-order'
import { usePaymentOrdersStore } from '@/stores/payment-orders'
import { createOrderRules, isCreateOrderFormValid } from '@/utils/create-order-rules'

const router = useRouter()
const store = usePaymentOrdersStore()
const formRef = ref<FormInstance>()
const form = reactive<CreatePaymentOrderForm>(emptyCreatePaymentOrderForm())
const isSubmitting = ref(false)

const canSubmit = computed(
  () => isCreateOrderFormValid(form) && !isSubmitting.value,
)

function goBack() {
  router.push({ name: 'orders-list' })
}

async function handleSubmit() {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
  } catch {
    return
  }

  isSubmitting.value = true

  try {
    await store.createOrder(form)
    router.push({
      name: 'orders-list',
      state: { orderCreated: true },
    })
  } catch {
    ElMessage.error('No pudimos crear la orden. Verifica la API e intenta de nuevo.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="order-create">
    <header class="order-create__header">
      <h1>Nueva orden de pago</h1>
      <p class="order-create__subtitle">Registra un pago a proveedor</p>
    </header>

    <el-form
      ref="formRef"
      :model="form"
      :rules="createOrderRules"
      label-position="top"
      class="order-create__form"
      @submit.prevent="handleSubmit"
    >
      <el-form-item label="Proveedor" prop="proveedor">
        <el-input v-model="form.proveedor" placeholder="Nombre del proveedor" />
      </el-form-item>

      <el-form-item label="Monto (COP)" prop="monto">
        <el-input-number
          v-model="form.monto"
          :min="0"
          :step="1000"
          controls-position="right"
          placeholder="0"
          class="order-create__amount"
        />
      </el-form-item>

      <el-form-item label="Concepto" prop="concepto">
        <el-input
          v-model="form.concepto"
          type="textarea"
          :rows="5"
          :maxlength="MAX_CONCEPT_LENGTH"
          show-word-limit
          placeholder="Describe el motivo del pago"
        />
      </el-form-item>

      <div class="order-create__actions">
        <el-button @click="goBack">Cancelar</el-button>
        <el-button
          type="primary"
          :disabled="!canSubmit"
          :loading="isSubmitting"
          @click="handleSubmit"
        >
          Crear orden
        </el-button>
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
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

/* Tablet */
@media (min-width: 768px) {
  .order-create {
    padding: 1.5rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .order-create__header h1 {
    font-size: 1.75rem;
  }

  .order-create__form {
    padding: 1.25rem;
  }
}
</style>
