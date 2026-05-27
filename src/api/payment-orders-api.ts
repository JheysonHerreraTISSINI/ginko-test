import type { PaymentOrder } from '@/types/payment-order'
import { apiClient } from './client'

export async function fetchPaymentOrders(): Promise<PaymentOrder[]> {
  const { data } = await apiClient.get<PaymentOrder[]>('/ordenes')
  return data
}

export async function createPaymentOrder(order: PaymentOrder): Promise<PaymentOrder> {
  const { data } = await apiClient.post<PaymentOrder>('/ordenes', order)
  return data
}
