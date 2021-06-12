import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/theme',
    name: 'Home',
    component: Home
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  },
  {
    path: '/end',
    name: 'End',
    component: () => import( '../views/End.vue')
  },
  {
    path: '/survey',
    name: 'Survey',
    component: () => import( '../views/Survey.vue')
  },
  {
    path: '/',
    redirect: '/404',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
