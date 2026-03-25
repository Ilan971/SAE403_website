import { defineStore } from 'pinia';
import api from '../services/api';
import { toast } from 'vue3-toastify';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await api.post('/login', { email, password });
        this.token = response.data.token;
        this.user = response.data.user;
        
        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));
        
        toast.success("Connexion réussie !");
        
        return true;
      } catch (error) {
        toast.error("Email ou mot de passe incorrect.");
        throw error;
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      toast.info("Vous êtes déconnecté.");
    },
    initAuth() {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (token && user) {
        this.token = token;
        try {
          this.user = JSON.parse(user);
        } catch (e) {
          this.user = null;
        }
      }
    }
  }
});
