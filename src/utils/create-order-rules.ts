import type { FormRules } from 'element-plus'
import { MAX_CONCEPT_LENGTH } from '@/constants/order.constant'
import type { CreatePaymentOrderForm } from '@/types/create-payment-order'

export const createOrderRules: FormRules<CreatePaymentOrderForm> = {
  proveedor: [
    {
      required: true,
      message: 'El proveedor es obligatorio',
      trigger: ['blur', 'change'],
    },
  ],
  monto: [
    {
      validator: (_rule, value, callback) => {
        if (value === null || value === undefined) {
          callback(new Error('El monto es obligatorio'))
          return
        }
        if (value <= 0) {
          callback(new Error('El monto debe ser mayor que cero'))
          return
        }
        callback()
      },
      trigger: ['blur', 'change'],
    },
  ],
  concepto: [
    {
      required: true,
      message: 'El concepto es obligatorio',
      trigger: ['blur', 'change'],
    },
    {
      max: MAX_CONCEPT_LENGTH,
      message: `Máximo ${MAX_CONCEPT_LENGTH} caracteres`,
      trigger: ['blur', 'change'],
    },
  ],
}

export function isCreateOrderFormValid(form: CreatePaymentOrderForm): boolean {
  const proveedorOk = form.proveedor.trim().length > 0
  const montoOk = form.monto !== null && form.monto > 0
  const conceptoOk =
    form.concepto.trim().length > 0 && form.concepto.length <= MAX_CONCEPT_LENGTH

  return proveedorOk && montoOk && conceptoOk
}