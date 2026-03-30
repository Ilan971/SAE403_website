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
          path: 'documents',
          name: 'documentList',
          component: () => import('../views/DocumentsView.vue'),
        },
        {
          path: 'profil',
          name: 'profil',
          component: () => import('../views/ProfilView.vue'),
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
        },
        {
          path: 'annonces',
          name: 'annonceList',
          component: () => import('../views/AnnonceListView.vue'),
        }
      ]
    },
    {
      path: '/student',
      component: () => import('../layouts/StudentLayout.vue'),
      meta: { requiresAuth: true }, // Protégé et réservé aux étudiants (géré par le beforeEach)
      children: [
        {
          path: '',
          redirect: '/student/dashboard'
        },
        {
          path: 'dashboard',
          name: 'studentDashboard',
          component: () => import('../views/StudentDashboardView.vue'),
        },
        {
          path: 'sae/:status',
          name: 'studentSaeList',
          component: () => import('../views/StudentSaeListView.vue'),
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
  
  if (to.meta.requiresAuth && authStore.user) {
    const isAdmin = authStore.user.role === 'ROLE_ADMIN';
    const isStudentRoute = to.path.startsWith('/student');
    
    // Redirection si un étudiant tente d'accéder au backoffice admin
    if (!isAdmin && !isStudentRoute) {
      return '/student/dashboard';
    }
    
    // Redirection si admin tente d'accéder à l'espace étudiant (optionnel)
    if (isAdmin && isStudentRoute) {
       return '/dashboard';
    }
  }
});

export default router;
