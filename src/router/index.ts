import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'orders-list',
      component: () => import('@/views/OrdersListView.vue'),
    },
    {
      path: '/ordenes/nueva',
      name: 'order-create',
      component: () => import('@/views/OrderCreateView.vue'),
    },
    {
      path: '/ordenes/:id',
      name: 'order-detail',
      component: () => import('@/views/OrderDetailView.vue'),
    },
  ],
})

export default router
