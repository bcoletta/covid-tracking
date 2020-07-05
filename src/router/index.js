import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/USData.vue'),
  },
  {
    path: '/state',
    name: 'daily-by-state',
    component: () => import('../views/StateData.vue'),
  },
  {
    path: '/state/:state',
    name: 'daily-by-state',
    component: () => import('../views/StateData.vue'),
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import('../views/About'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
