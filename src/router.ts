import { createRouter, createWebHistory } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    alias: '/products',
    name: 'products',
    component: () => import('./views/Products.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('./views/Settings.vue')
  },
]; 

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;