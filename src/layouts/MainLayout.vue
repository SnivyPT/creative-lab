<template>
  <div class="flex h-screen overflow-hidden text-white bg-gray-900">
    <!-- Sidebar (always collapsed) -->
    <aside class="w-16 bg-gray-800 text-gray-100 flex flex-col items-center py-4 space-y-4 relative">
      <!-- Logo -->
      <img src="@/assets/logo.png" alt="Logo" class="w-10 h-10 rounded-full object-cover" />

      <!-- Nav -->
      <nav class="space-y-4 mt-4 relative">
        <router-link
          to="/"
          class="flex items-center justify-center p-2 rounded hover:bg-gray-700 relative group"
          exact-active-class="bg-gray-700 text-emerald-300"
          :exact="true"
        >
          <LayoutDashboard class="w-6 h-6" />
          <div
            class="absolute left-16 bg-gray-900 text-sm text-white px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none z-50"
          >
            Dashboard
          </div>
        </router-link>

        <router-link
          to="/vault"
          class="flex items-center justify-center p-2 rounded hover:bg-gray-700 relative group"
          exact-active-class="bg-gray-700 text-emerald-300"
        >
          <Brain class="w-6 h-6" />
          <div
            class="absolute left-16 bg-gray-900 text-sm text-white px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none z-50"
          >
            Idea Vault
          </div>
        </router-link>

        <router-link
          to="/tools/prompts"
          class="flex items-center justify-center p-2 rounded hover:bg-gray-700 relative group"
          exact-active-class="bg-gray-700 text-emerald-300"
        >
          <Dice5 class="w-6 h-6" />
          <div
            class="absolute left-16 bg-gray-900 text-sm text-white px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none z-50"
          >
            Prompts
          </div>
        </router-link>

        <router-link
          to="/tools/challenges"
          class="flex items-center justify-center p-2 rounded hover:bg-gray-700 relative group"
          exact-active-class="bg-gray-700 text-emerald-300"
        >
          <BadgePlus class="w-6 h-6" />
          <div
            class="absolute left-16 bg-gray-900 text-sm text-white px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none z-50"
          >
            Challenges
          </div>
        </router-link>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 overflow-y-auto">
      <!-- Topbar -->
      <header class="w-full bg-emerald-600 text-white px-6 py-5 shadow-md">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">Creative Lab</h2>
          <span class="text-sm opacity-80">Settings / Login</span>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-8">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { LayoutDashboard, Brain, Dice5, BadgePlus } from 'lucide-vue-next'
</script>
