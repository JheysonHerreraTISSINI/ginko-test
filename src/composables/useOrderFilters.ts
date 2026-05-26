import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  parseSearchQuery,
  parseStatusFilter,
} from '@/utils/filter-orders'
import type { StatusFilter } from '@/types/payment-order'

export function useOrderFilters() {
  const route = useRoute()
  const router = useRouter()

  const statusFilter = ref<StatusFilter>('todos')
  const searchQuery = ref('')

  function readFiltersFromUrl() {
    statusFilter.value = parseStatusFilter(route.query.estado)
    searchQuery.value = parseSearchQuery(route.query.busqueda)
  }

  function writeFiltersToUrl() {
    const query: Record<string, string> = {}

    if (statusFilter.value !== 'todos') {
      query.estado = statusFilter.value
    }

    const term = searchQuery.value.trim()
    if (term) {
      query.busqueda = term
    }

    router.replace({ query })
  }

  readFiltersFromUrl()

  watch(() => route.query, readFiltersFromUrl)
  watch([statusFilter, searchQuery], writeFiltersToUrl)

  return {
    statusFilter,
    searchQuery,
  }
}
