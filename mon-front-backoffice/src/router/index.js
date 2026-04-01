import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import AdminLayout from '../layouts/AdminLayout.vue';
import { useAuthStore } from '../stores/authStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' };
    return { top: 0 };
  },
  routes: [
    // ===== PAGE D'ACCUEIL (publique) =====
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    // ===== ESPACE ADMIN =====
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true, role: 'ROLE_ADMIN' },
      children: [
        {
          path: '',
          redirect: '/admin/dashboard'
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue'),
        },
        {
          path: 'profil',
          name: 'profil',
          component: () => import('../views/ProfilView.vue'),
        },
        {
          path: 'users',
          name: 'userList',
          component: () => import('../views/UserListView.vue'),
        },
        {
          path: 'sae',
          name: 'adminSaeList',
          component: () => import('../views/SaeListView.vue'),
        },
        {
          path: 'sae/:id',
          name: 'adminSaeDetail',
          component: () => import('../views/SaeDetailView.vue'),
        },
        {
          path: 'annonces',
          name: 'adminAnnonceList',
          component: () => import('../views/AnnonceListView.vue'),
        }
      ]
    },
    // ===== ESPACE PROFESSEUR =====
    {
      path: '/teacher',
      component: () => import('../layouts/TeacherLayout.vue'),
      meta: { requiresAuth: true, role: 'ROLE_PROF' },
      children: [
        {
          path: '',
          redirect: '/teacher/dashboard'
        },
        {
          path: 'dashboard',
          name: 'teacherDashboard',
          component: () => import('../views/DashboardView.vue'),
        },
        {
          path: 'documents',
          name: 'teacherDocumentList',
          component: () => import('../views/DocumentsView.vue'),
        },
        {
          path: 'profil',
          name: 'teacherProfil',
          component: () => import('../views/ProfilView.vue'),
        },
        {
          path: 'sae',
          name: 'teacherSaeList',
          component: () => import('../views/SaeListView.vue'),
        },
        {
          path: 'sae/:id',
          name: 'teacherSaeDetail',
          component: () => import('../views/SaeDetailView.vue'),
        },
        {
          path: 'annonces',
          name: 'teacherAnnonceList',
          component: () => import('../views/AnnonceListView.vue'),
        }
      ]
    },
    // ===== ESPACE ÉTUDIANT =====
    {
      path: '/student',
      component: () => import('../layouts/StudentLayout.vue'),
      meta: { requiresAuth: true, role: 'ROLE_USER' },
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
          path: 'profil',
          name: 'studentProfil',
          component: () => import('../views/ProfilView.vue'),
        },
        {
          path: 'sae/:status',
          name: 'studentSaeList',
          component: () => import('../views/StudentSaeListView.vue'),
        },
        {
          path: 'sae-detail/:id',
          name: 'studentSaeDetail',
          component: () => import('../views/StudentSaeDetailView.vue'),
        }
      ]
    }
  ]
});

// Navigation Guard (Sécurité Front - 3 rôles)
router.beforeEach((to, from) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.token) {
    return '/login';
  }
  
  if (to.meta.requiresAuth && authStore.user) {
    const role = authStore.user.role;
    const path = to.path;
    
    // Admin accède à /admin
    if (role === 'ROLE_ADMIN' && !path.startsWith('/admin')) {
      return '/admin/dashboard';
    }
    
    // Prof accède à /teacher
    if (role === 'ROLE_PROF' && !path.startsWith('/teacher')) {
      return '/teacher/dashboard';
    }
    
    // Étudiant accède à /student
    if (role === 'ROLE_USER' && !path.startsWith('/student')) {
      return '/student/dashboard';
    }
  }
});

export default router;
