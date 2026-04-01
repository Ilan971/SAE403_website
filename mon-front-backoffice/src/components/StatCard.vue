<template>
  <component 
    :is="to ? 'router-link' : 'div'" 
    :to="to"
    class="bg-[#242931] p-5 rounded-2xl shadow-lg border border-gray-700/30 flex items-center justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 transition-all duration-300 group cursor-pointer no-underline block"
  >
    <div class="flex flex-col h-full justify-between overflow-hidden">
      <h4 class="text-[13px] font-bold text-gray-400 truncate mb-1">{{ title }}</h4>
      <p class="text-2xl font-extrabold text-white">{{ value }}</p>
      <p class="text-[11px] text-gray-500 font-medium mt-1 truncate">{{ subtitle }}</p>
    </div>
    
    <div class="flex-shrink-0 ml-3 h-[52px] w-[52px] rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner" :class="colorBoxClass">
      <slot name="icon">
        <!-- Default icon if none provided -->
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </slot>
    </div>
  </component>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [Number, String],
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'indigo'
  },
  to: {
    type: String,
    default: null
  }
});

const colorBoxClass = computed(() => {
  const colors = {
    indigo: 'bg-[#6366F1] text-white',
    green: 'bg-[#10B981] text-white',
    blue: 'bg-[#3B82F6] text-white',
    purple: 'bg-[#8B5CF6] text-white',
    orange: 'bg-[#EAB308] text-white', // using yellow-ish orange for the "A venir" look
    pink: 'bg-[#EC4899] text-white',
    red: 'bg-[#EF4444] text-white',
    gray: 'bg-gray-600 text-white'
  };
  return colors[props.color] || colors.indigo;
});
</script>
