import type { FormRules } from 'element-plus'
import { MAX_CONCEPT_LENGTH } from '@/constants/order.constant'
import type { CreatePaymentOrderForm } from '@/types/create-payment-order'

export const createOrderRules: FormRules<CreatePaymentOrderForm> = {
  proveedor: [
    {
      required: true,
      message: 'El proveedor es obligatorio',
      trigger: 'blur',
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
      trigger: 'blur',
    },
  ],
  concepto: [
    {
      required: true,
      message: 'El concepto es obligatorio',
      trigger: 'blur',
    },
    {
      max: MAX_CONCEPT_LENGTH,
      message: `Máximo ${MAX_CONCEPT_LENGTH} caracteres`,
      trigger: 'blur',
    },
  ],
}
