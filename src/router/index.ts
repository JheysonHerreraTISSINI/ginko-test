import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'orders-list',
      component: () => import('@/views/OrdersListView.vue'),
    },
  ],
})

export default router
