import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import AdminLayout from '../layouts/AdminLayout.vue';
import { useAuthStore } from '../stores/authStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/',
      component: AdminLayout,
      meta: { requiresAuth: true }, // Toutes les routes enfants sont protégées
      children: [
        {
          path: '',
          redirect: '/dashboard'
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue'),
        },
        {
          path: 'sae',
          name: 'saeList',
          component: () => import('../views/SaeListView.vue'),
        },
        {
          path: 'sae/:id',
          name: 'saeDetail',
          component: () => import('../views/SaeDetailView.vue'),
        },
        {
          path: 'users',
          name: 'userList',
          component: () => import('../views/UserListView.vue'),
        }
      ]
    }
  ]
});

// Navigation Guard (Sécurité Front)
router.beforeEach((to, from) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.token) {
    return '/login';
  }
});

export default router;
