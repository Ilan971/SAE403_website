<template>
  <div class="min-h-screen bg-[#0A0D14] text-white font-sans overflow-x-hidden">
    <!-- Navigation Bar -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-[#0A0D14]/80 backdrop-blur-2xl border-b border-white/5">
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
          <span class="text-lg font-extrabold tracking-wide">Bosto<span class="text-blue-400">campus</span></span>
        </div>
        <div class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#projets" class="hover:text-white transition-colors">Projets SAE</a>
          <a href="#formation" class="hover:text-white transition-colors">Formation MMI</a>
          <a href="#campus" class="hover:text-white transition-colors">Le Campus</a>
        </div>
        <div class="flex items-center gap-4">
          <router-link to="/login" class="px-7 py-3 text-[15px] font-extrabold text-cyan-400 border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-400 hover:-translate-y-0.5 rounded-xl transition-all">
            Connexion
          </router-link>
          <router-link to="/register" class="px-7 py-3 text-[15px] font-extrabold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl shadow-lg shadow-purple-500/30 hover:-translate-y-0.5 transition-all">
            S'inscrire
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative pt-32 pb-24 px-6 overflow-hidden min-h-[90vh] flex items-center">
      <!-- Ambient glow -->
      <div class="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-600/20 blur-[150px] rounded-full pointer-events-none"></div>
      <div class="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/15 blur-[150px] rounded-full pointer-events-none"></div>
      <div class="absolute top-[30%] left-[50%] w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div class="max-w-7xl mx-auto w-full relative z-10">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 text-sm font-bold text-blue-400 mb-8">
            <span class="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            Formation MMI — BUT Métiers du Multimédia et de l'Internet
          </div>
          <h1 class="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight mb-8">
            Découvrez les
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500"> projets SAE </span>
            de nos étudiants
          </h1>
          <p class="text-xl text-gray-400 leading-relaxed mb-12 max-w-2xl">
            Explorez les réalisations de la formation MMI : développement web, design UX/UI,
            audiovisuel, communication digitale et bien plus encore.
          </p>
          <div class="flex flex-wrap gap-5 mt-6">
            <a href="#projets" class="px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-2xl text-lg font-extrabold shadow-xl shadow-blue-500/30 transition-all hover:-translate-y-1">
              Explorer les projets
            </a>
            <a href="#formation" class="px-10 py-5 border-2 border-emerald-500/50 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 hover:border-emerald-400 hover:text-emerald-300 rounded-2xl text-lg font-extrabold transition-all hover:-translate-y-1">
              En savoir plus
            </a>
          </div>
        </div>

        <!-- Stats flottants -->
        <div class="grid grid-cols-3 gap-6 mt-20 max-w-lg">
          <div class="text-center">
            <p class="text-3xl font-extrabold text-white">{{ saes.length || '—' }}</p>
            <p class="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Projets SAE</p>
          </div>
          <div class="text-center border-x border-white/10">
            <p class="text-3xl font-extrabold text-white">3</p>
            <p class="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Années</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-extrabold text-white">MMI</p>
            <p class="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Formation</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Projets SAE Section -->
    <section id="projets" class="py-24 px-6 relative">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <span class="text-sm font-bold text-blue-400 uppercase tracking-widest">Portfolio</span>
          <h2 class="text-4xl md:text-5xl font-extrabold mt-4 tracking-tight">Projets SAE publiés</h2>
          <p class="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">Les Situations d'Apprentissage et d'Évaluation réalisées par nos étudiants tout au long de leur cursus.</p>
        </div>

        <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="i in 6" :key="i" class="bg-[#12161E] rounded-3xl h-[320px] animate-pulse border border-white/5"></div>
        </div>

        <div v-else-if="saes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(sae, index) in saes" :key="sae.id" 
               class="group bg-[#12161E] rounded-3xl border border-white/5 overflow-hidden hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 flex flex-col">
            <!-- Cover -->
            <div class="h-48 w-full relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br opacity-80 z-10"
                   :class="coverGradients[index % coverGradients.length]"></div>
              <div class="absolute inset-0 z-20 flex items-center justify-center">
                <span class="text-6xl font-extrabold text-white/20">S{{ sae.semestre }}</span>
              </div>
            </div>
            <!-- Content -->
            <div class="p-6 flex flex-col flex-1">
              <div class="flex items-center gap-2 mb-3">
                <span class="bg-blue-500/10 text-blue-400 text-[11px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md border border-blue-500/20">Semestre {{ sae.semestre }}</span>
                <span class="bg-white/5 text-gray-400 text-[11px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md border border-white/5">{{ sae.anneeUniversitaire }}</span>
              </div>
              <h3 class="text-lg font-bold text-white group-hover:text-blue-400 transition-colors leading-tight mb-3">{{ sae.titre }}</h3>
              <p class="text-sm text-gray-500 line-clamp-2 flex-1">{{ sae.description || 'Projet réalisé dans le cadre de la formation MMI.' }}</p>
              <div class="mt-5 pt-4 border-t border-white/5 flex justify-between items-center">
                <span class="text-xs text-gray-500 font-medium">
                  <svg class="w-4 h-4 inline mr-1 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {{ formatDate(sae.dateEcheance) }}
                </span>
                <span class="text-blue-400 text-sm font-bold flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  Voir plus
                  <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-20">
          <p class="text-gray-500 text-lg">Aucun projet SAE publié pour le moment.</p>
        </div>
      </div>
    </section>

    <!-- Formation MMI Section -->
    <section id="formation" class="py-24 px-6 relative">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/5 to-transparent pointer-events-none"></div>
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="text-center mb-16">
          <span class="text-sm font-bold text-purple-400 uppercase tracking-widest">Formation</span>
          <h2 class="text-4xl md:text-5xl font-extrabold mt-4 tracking-tight">BUT MMI en 3 ans</h2>
          <p class="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">Un parcours complet pour devenir un professionnel polyvalent du numérique.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(comp, i) in competences" :key="i" 
               class="bg-[#12161E] rounded-3xl p-8 border border-white/5 hover:border-purple-500/20 transition-all duration-300 group hover:-translate-y-1">
            <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3"
                 :class="comp.bgClass">
              <component :is="comp.iconComponent" class="w-7 h-7 text-white" />
            </div>
            <h3 class="text-lg font-bold text-white mb-3">{{ comp.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ comp.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Campus Section -->
    <section id="campus" class="py-24 px-6 relative">
      <div class="max-w-7xl mx-auto">
        <div class="bg-[#12161E] rounded-[32px] border border-white/5 overflow-hidden relative">
          <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none"></div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div class="p-12 lg:p-16 flex flex-col justify-center relative z-10">
              <span class="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4">Notre Campus</span>
              <h2 class="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">Un environnement propice à la créativité</h2>
              <p class="text-gray-400 leading-relaxed mb-8">
                Le département MMI offre des équipements de pointe : studios audiovisuels, 
                salles informatiques, espaces de coworking et laboratoires créatifs. 
                Nos étudiants bénéficient d'un cadre moderne et stimulant pour développer 
                leurs compétences numériques.
              </p>
              <div class="grid grid-cols-2 gap-6">
                <div>
                  <p class="text-2xl font-extrabold text-white">120+</p>
                  <p class="text-sm text-gray-500 font-medium mt-1">Étudiants par promotion</p>
                </div>
                <div>
                  <p class="text-2xl font-extrabold text-white">15+</p>
                  <p class="text-sm text-gray-500 font-medium mt-1">Enseignants spécialisés</p>
                </div>
                <div>
                  <p class="text-2xl font-extrabold text-white">92%</p>
                  <p class="text-sm text-gray-500 font-medium mt-1">Taux d'insertion</p>
                </div>
                <div>
                  <p class="text-2xl font-extrabold text-white">6</p>
                  <p class="text-sm text-gray-500 font-medium mt-1">Semestres de formation</p>
                </div>
              </div>
            </div>
            <div class="h-80 lg:h-auto bg-gradient-to-br from-indigo-600/30 to-purple-600/30 flex items-center justify-center">
              <div class="text-center px-8">
                <div class="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30 mb-6">
                  <svg class="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p class="text-2xl font-extrabold text-white">IUT — Département MMI</p>
                <p class="text-gray-400 mt-2">Métiers du Multimédia et de l'Internet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 px-6 border-t border-white/5">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
          <span class="text-sm font-bold text-gray-400">Bostocampus © {{ new Date().getFullYear() }}</span>
        </div>
        <div class="flex items-center gap-6 text-sm text-gray-500">
          <router-link to="/login" class="hover:text-white transition-colors">Connexion</router-link>
          <a href="#projets" class="hover:text-white transition-colors">Projets</a>
          <a href="#formation" class="hover:text-white transition-colors">Formation</a>
          <a href="#campus" class="hover:text-white transition-colors">Campus</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, h } from 'vue';
import axios from 'axios';

const saes = ref([]);
const isLoading = ref(true);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const coverGradients = [
  'from-blue-600 to-indigo-700',
  'from-purple-600 to-pink-600',
  'from-emerald-600 to-teal-700',
  'from-orange-500 to-red-600',
  'from-cyan-500 to-blue-600',
  'from-violet-600 to-purple-700',
];

// Simple icon components
const CodeIcon = { render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', class: 'w-7 h-7' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' })]) };
const PaletteIcon = { render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', class: 'w-7 h-7' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' })]) };
const VideoIcon = { render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', class: 'w-7 h-7' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' })]) };
const MegaphoneIcon = { render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', class: 'w-7 h-7' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' })]) };

const competences = [
  { title: 'Développement Web', description: 'HTML, CSS, JavaScript, frameworks modernes (Vue.js, React), bases de données et API.', bgClass: 'bg-blue-600', iconComponent: CodeIcon },
  { title: 'Design UX/UI', description: 'Conception centrée utilisateur, prototypage, identité visuelle et design d\'interfaces.', bgClass: 'bg-purple-600', iconComponent: PaletteIcon },
  { title: 'Audiovisuel', description: 'Production vidéo, montage, motion design, photographie et post-production.', bgClass: 'bg-red-500', iconComponent: VideoIcon },
  { title: 'Communication', description: 'Stratégie digitale, réseaux sociaux, rédaction web et marketing de contenu.', bgClass: 'bg-emerald-600', iconComponent: MegaphoneIcon },
];

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
};

onMounted(async () => {
  try {
    const response = await axios.get(`${API_URL}/api/sae/public`);
    saes.value = response.data || [];
  } catch (error) {
    console.error('Erreur chargement SAE publiques:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
