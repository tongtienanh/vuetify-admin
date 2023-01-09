// Composables
import { createRouter, createWebHistory } from 'vue-router'
import {TokenService} from "@/services/token";

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      // {
      //   path: 'module',
      //   name: 'Module',
      //   component: () => import(/* webpackChunkName: "home" */ '@/views/Module.vue'),
      // },
      // {
      //   path: 'module/role/:id',
      //   name: 'Module',
      //   component: () => import(/* webpackChunkName: "home" */ '@/views/Module.vue'),
      // },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/default/LoginLayout.vue'),
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Login.vue'),
      },
    ],
  },
  {
    path: '/module',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Module',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Module.vue'),
      },
      {
        path: 'role/:id',
        name: 'Role',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Role.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
router.beforeEach(async (to, from, next) => {
  const loggedIn = !!TokenService.getToken();
  if(to.path != '/login') {
    if(loggedIn) {
      next();
    } else {
      next('login');
    }
  } else {
    console.log('You\'re on the login page');
    next();
  }
})

export default router
