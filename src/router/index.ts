import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import ('../App.vue')
  },
  {
    path: '/sign-in/',
    component: () => import ('../views/SignInPage.vue')
  },
  {
    path: '/sign-up/',
    component: () => import ('../views/SignUpPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
