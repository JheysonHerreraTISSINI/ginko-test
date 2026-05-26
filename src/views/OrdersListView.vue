<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import OrdersCards from '@/components/orders/OrdersCards.vue'
import OrdersPagination from '@/components/orders/OrdersPagination.vue'
import OrdersStatusFilter from '@/components/orders/OrdersStatusFilter.vue'
import OrdersTable from '@/components/orders/OrdersTable.vue'
import ViewMessage from '@/components/ui/ViewMessage.vue'
import { ORDERS_PAGE_SIZE } from '@/constants/pagination'
import { useClientPagination } from '@/composables/useClientPagination'
import { usePaymentOrdersStore } from '@/stores/payment-orders'
import type { StatusFilter } from '@/types/payment-order'

const store = usePaymentOrdersStore()
const { orders, loading, error, isEmpty } = storeToRefs(store)

const statusFilter = ref<StatusFilter>('todos')

const filteredOrders = computed(() => {
  if (statusFilter.value === 'todos') {
    return orders.value
  }
  return orders.value.filter((order) => order.estado === statusFilter.value)
})

const { currentPage, paginatedItems, rangeLabel, goToPage, resetPage } =
  useClientPagination(filteredOrders, ORDERS_PAGE_SIZE)

onMounted(() => {
  store.loadOrders()
})

watch(orders, () => {
  resetPage()
})

watch(statusFilter, () => {
  resetPage()
})
</script>

<template>
  <section class="orders-list">
    <header class="orders-list__header">
      <h1>Órdenes de pago</h1>
      <p class="orders-list__subtitle">Gestión de pagos a proveedores</p>
    </header>

    <ViewMessage
      v-if="loading"
      variant="loading"
      title="Cargando órdenes..."
      description="Estamos obteniendo la información del servidor."
    />

    <ViewMessage
      v-else-if="error"
      variant="error"
      :title="error"
    >
      <button type="button" class="orders-list__retry" @click="store.loadOrders()">
        Reintentar
      </button>
    </ViewMessage>

    <ViewMessage
      v-else-if="isEmpty"
      variant="empty"
      title="No hay órdenes registradas"
      description="Cuando existan órdenes de pago, aparecerán en este listado."
    />

    <template v-else>
      <OrdersStatusFilter v-model:status-filter="statusFilter" />

      <div class="orders-list__desktop">
        <OrdersTable :orders="paginatedItems" />
      </div>
      <div class="orders-list__mobile">
        <OrdersCards :orders="paginatedItems" />
      </div>

      <OrdersPagination
        :current-page="currentPage"
        :page-size="ORDERS_PAGE_SIZE"
        :total="filteredOrders.length"
        :range-label="rangeLabel"
        @update:current-page="goToPage"
      />
    </template>
  </section>
</template>

<style scoped>
.orders-list {
  padding: 1.25rem 1rem;
  max-width: 72rem;
  margin: 0 auto;
}

.orders-list__header {
  margin-bottom: 1.25rem;
}

.orders-list__header h1 {
  margin: 0;
  font-size: 1.5rem;
}

.orders-list__subtitle {
  margin: 0.25rem 0 0;
  color: #6b7280;
  font-size: 0.9rem;
}

.orders-list__desktop {
  display: none;
}

.orders-list__mobile {
  display: block;
}

.orders-list__retry {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: #fff;
  cursor: pointer;
}

.orders-list__retry:hover {
  background: #f9fafb;
}

/* Tablet y desktop: tabla */
@media (min-width: 768px) {
  .orders-list {
    padding: 1.5rem;
  }

  .orders-list__desktop {
    display: block;
  }

  .orders-list__mobile {
    display: none;
  }
}

/* Desktop: más aire */
@media (min-width: 1024px) {
  .orders-list__header h1 {
    font-size: 1.75rem;
  }
}
</style>
