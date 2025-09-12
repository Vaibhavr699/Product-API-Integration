import { createRouter, createWebHistory } from 'vue-router'
import ProductPage from '../pages/ProductPage.vue'
import UserPage from '../pages/UserPage.vue'
import ProductDetailsPage from '../pages/ProductDetailsPage.vue'
import UserDetailsPage from '../pages/UserDetailsPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/products'
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductPage
  },
  {
    path: '/users',
    name: 'Users',
    component: UserPage
  },
  {
    path: '/products/:id',
    name: 'ProductDetails',
    component: ProductDetailsPage,
    props: true
  },
  {
    path: '/users/:id',
    name: 'UserDetails',
    component: UserDetailsPage,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
