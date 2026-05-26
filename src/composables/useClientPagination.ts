import { computed, ref, toValue, type MaybeRefOrGetter } from 'vue'

export function useClientPagination<T>(
  itemsSource: MaybeRefOrGetter<T[]>,
  pageSize: number,
) {
  const currentPage = ref(1)
  const items = computed(() => toValue(itemsSource))

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(items.value.length / pageSize)),
  )

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return items.value.slice(start, start + pageSize)
  })

  const rangeLabel = computed(() => {
    if (items.value.length === 0) return '0 órdenes'
    const start = (currentPage.value - 1) * pageSize + 1
    const end = Math.min(currentPage.value * pageSize, items.value.length)
    return `${start}–${end} de ${items.value.length}`
  })

  function goToPage(page: number) {
    currentPage.value = Math.min(Math.max(1, page), totalPages.value)
  }

  function resetPage() {
    currentPage.value = 1
  }

  return {
    currentPage,
    totalPages,
    paginatedItems,
    rangeLabel,
    goToPage,
    resetPage,
  }
}
