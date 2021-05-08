import Vue from 'vue'
import VueRouter from 'vue-router'
import Menu from '../views/Menu.vue'
import Foods from '../views/Foods.vue'
import Drinks from '../views/Drinks.vue'
import Snacks from '../views/Snacks.vue'
import Order from '../views/Order.vue'

Vue.use(VueRouter)

const routes = [
  {
      path: '/:tableNumber',
      name: 'Menu',
      component: Menu
  },
  {
      path: '/Foods/:tableNumber',
      name: 'Foods',
      component: Foods
  },
  {
      path: '/Drinks/:tableNumber',
      name: 'Drinks',
      component: Drinks
  },
  {
      path: '/Snacks/:tableNumber',
      name: 'Snacks',
      component: Snacks
  },
  {
      path: '/Order/:tableNumber',
      name: 'Order',
      component: Order
  }
]

const router = new VueRouter({
mode: 'history',
base: process.env.BASE_URL,
routes,
})

export default router