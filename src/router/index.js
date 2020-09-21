import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
      path: '/connect',
      name: 'Connect',
      component: () => import('@/views/Connect.vue')
  },
  {
    path: '/produits',
    name: 'Produits',
    component: () => import('@/views/Produits.vue')
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/views/Orders.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'Connect' && store.state.token === null) next({ name: 'Connect' })
    else next()
  })

export default router
