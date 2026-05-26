import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useClientPagination } from '../useClientPagination'

describe('useClientPagination', () => {
  it('pagina elementos del lado del cliente', () => {
    const items = ref([1, 2, 3, 4, 5, 6])
    const { paginatedItems, totalPages, goToPage, currentPage } = useClientPagination(
      items,
      2,
    )

    expect(paginatedItems.value).toEqual([1, 2])
    expect(totalPages.value).toBe(3)

    goToPage(2)
    expect(currentPage.value).toBe(2)
    expect(paginatedItems.value).toEqual([3, 4])
  })

  it('genera etiqueta de rango', () => {
    const items = ref(['a', 'b', 'c'])
    const { rangeLabel } = useClientPagination(items, 2)
    expect(rangeLabel.value).toBe('1–2 de 3')
  })
})
