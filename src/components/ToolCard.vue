<template>
  <router-link
    :to="to"
    class="group bg-gray-800 text-white rounded-2xl p-4 shadow-md hover:ring-2 hover:ring-emerald-400 transition cursor-pointer w-full h-40 flex flex-col justify-between"
  >
    <div class="flex items-center gap-2">
      <component :is="icon" class="w-6 h-6 text-emerald-300" />
      <h3 class="text-lg font-bold">{{ title }}</h3>
    </div>
    <p class="text-sm text-gray-300 group-hover:text-white">{{ description }}</p>
  </router-link>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  icon: Object,
  to: String
});
</script>
