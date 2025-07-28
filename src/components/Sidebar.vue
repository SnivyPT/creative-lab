<template>
  <aside class="w-64 bg-white h-full shadow-md hidden md:block">
    <nav class="p-4 space-y-4">
      <div class="text-2xl font-bold text-gray-800">Creative Lab</div>
      <ul class="space-y-2">
        <li>
          <router-link to="/" class="block text-gray-700 hover:text-blue-600">🏠 Dashboard</router-link>
        </li>
        <li>
          <router-link to="/vault" class="block text-gray-700 hover:text-blue-600">💡 Idea Vault</router-link>
        </li>
        <li>
          <router-link to="/tools" class="block text-gray-700 hover:text-blue-600">🧰 Tools</router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>
