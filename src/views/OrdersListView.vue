<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import OrdersCards from '@/components/orders/OrdersCards.vue'
import OrdersPagination from '@/components/orders/OrdersPagination.vue'
import OrdersSearchFilter from '@/components/orders/OrdersSearchFilter.vue'
import OrdersStatusFilter from '@/components/orders/OrdersStatusFilter.vue'
import OrdersTable from '@/components/orders/OrdersTable.vue'
import ViewMessage from '@/components/ui/ViewMessage.vue'
import { ORDERS_PAGE_SIZE } from '@/constants/pagination'
import { useClientPagination } from '@/composables/useClientPagination'
import { useOrderFilters } from '@/composables/useOrderFilters'
import { usePaymentOrdersStore } from '@/stores/payment-orders'
import { filterOrders } from '@/utils/filter-orders'

const router = useRouter()
const store = usePaymentOrdersStore()
const { orders, loading, error, isEmpty } = storeToRefs(store)

const { statusFilter, searchQuery } = useOrderFilters()

const filteredOrders = computed(() =>
  filterOrders(orders.value, statusFilter.value, searchQuery.value),
)

const hasFilteredResults = computed(() => filteredOrders.value.length > 0)

const { currentPage, paginatedItems, rangeLabel, goToPage, resetPage } =
  useClientPagination(filteredOrders, ORDERS_PAGE_SIZE)

onMounted(() => {
  if (history.state?.orderCreated) {
    ElMessage.success({
      message: 'Orden creada correctamente',
      duration: 3000,
    })
    history.replaceState({ ...history.state, orderCreated: undefined }, '')
  }

  store.loadOrders()
})

watch(orders, () => {
  resetPage()
})

watch(statusFilter, () => {
  resetPage()
})

watch(searchQuery, () => {
  resetPage()
})

function goToOrderDetail(orderId: string) {
  router.push({ name: 'order-detail', params: { id: orderId } })
}
</script>

<template>
  <section class="orders-list">
    <header class="orders-list__header">
      <div>
        <h1>Órdenes de pago</h1>
        <p class="orders-list__subtitle">Gestión de pagos a proveedores</p>
      </div>
      <RouterLink :to="{ name: 'order-create' }">
        <el-button type="primary">Nueva orden</el-button>
      </RouterLink>
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
      <el-button type="primary" @click="store.loadOrders()">
        Reintentar
      </el-button>
    </ViewMessage>

    <ViewMessage
      v-else-if="isEmpty"
      variant="empty"
      title="No hay órdenes registradas"
      description="Cuando existan órdenes de pago, aparecerán en este listado."
    />

    <template v-else>
      <div class="orders-list__filters">
        <OrdersStatusFilter v-model:status-filter="statusFilter" />
        <OrdersSearchFilter v-model:search-query="searchQuery" />
      </div>

      <ViewMessage
        v-if="!hasFilteredResults"
        variant="empty"
        title="Sin resultados para estos filtros"
        description="Prueba otro estado o un nombre de proveedor distinto."
      />

      <template v-else>
        <div class="orders-list__desktop">
          <OrdersTable :orders="paginatedItems" @select-order="goToOrderDetail" />
        </div>
        <div class="orders-list__mobile">
          <OrdersCards :orders="paginatedItems" @select-order="goToOrderDetail" />
        </div>

        <OrdersPagination
          :current-page="currentPage"
          :page-size="ORDERS_PAGE_SIZE"
          :total="filteredOrders.length"
          :range-label="rangeLabel"
          @update:current-page="goToPage"
        />
      </template>
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
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
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

.orders-list__filters {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

@media (min-width: 768px) {
  .orders-list__filters {
    flex-direction: row;
    align-items: flex-end;
    gap: 1.25rem;
  }

  .orders-list__filters > :first-child {
    flex: 0 0 14rem;
    max-width: 14rem;
  }

  .orders-list__filters > :last-child {
    flex: 1;
    min-width: 12rem;
  }
}

.orders-list__desktop {
  display: none;
}

.orders-list__mobile {
  display: block;
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
