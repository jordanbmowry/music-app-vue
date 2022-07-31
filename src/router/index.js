/* eslint-disable implicit-arrow-linebreak */
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import ManageView from '@/views/ManageView.vue';
import useUserStore from '@/store/user';

const routes = [
  {
    name: 'home',
    path: '/',
    component: HomeView,
  },
  { name: 'about', path: '/about', component: AboutView },
  {
    name: 'manage',
    // alias: '/manage',
    path: '/manage-music',
    component: ManageView,
    beforeEnter: (to, from, next) => {
      console.log('Manage Route Guard');
      next();
    },
    meta: {
      requiresAuth: true,
    },
  },
  { path: '/manage', redirect: '/manage-music' },

  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500',
});

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next();
    return;
  }
  const userStore = useUserStore();

  if (userStore.userLoggedIn) {
    next();
  } else {
    next({ name: 'home' });
  }
});

export default router;
