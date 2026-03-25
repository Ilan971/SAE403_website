<template>
  <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center hover:shadow-md transition-shadow">
    <div v-if="$slots.icon || icon" class="flex-shrink-0 mr-4 h-12 w-12 rounded-full flex items-center justify-center bg-opacity-20" :class="colorClass">
      <slot name="icon">
        <!-- Default icon if none provided -->
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </slot>
    </div>
    <div>
      <h4 class="text-sm font-medium text-gray-500 uppercase tracking-wider">{{ title }}</h4>
      <p class="mt-1 text-3xl font-bold text-gray-900">{{ value }}</p>
    </div>
  </div>
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
  icon: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'indigo'
  }
});

const colorClass = computed(() => {
  const colors = {
    indigo: 'bg-indigo-100 text-indigo-600',
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600',
    gray: 'bg-gray-100 text-gray-600'
  };
  return colors[props.color] || colors.indigo;
});
</script>
