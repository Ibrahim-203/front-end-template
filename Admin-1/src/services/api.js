import axios from 'axios';

// Configuration de base
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // À changer en production
  timeout: 10000, // 10 secondes
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT (si tu en utilises un plus tard)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur de réponse pour gérer les erreurs globalement
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Gestion des erreurs courantes
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // Token expiré ou invalide
        localStorage.removeItem('token');
        window.location.href = '/login';
        console.error("Session expirée. Redirection vers la connexion.");
      } 
      else if (status === 403) {
        console.error("Accès refusé.");
      } 
      else if (status === 500) {
        console.error("Erreur serveur interne.");
      }
    } else if (error.request) {
      console.error("Pas de réponse du serveur. Vérifiez votre connexion.");
    }

    return Promise.reject(error);
  }
);

export default api;