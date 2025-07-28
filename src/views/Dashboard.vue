<template>
  <div>
    <TodaysSpark />

    <section class="mt-6">
      <h2 class="text-xl font-semibold text-white mb-4">🛠️ Tools</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ToolCard
          title="Idea Vault"
          description="Capture and organize creative ideas."
          :icon="Brain"
          to="/vault"
        />
        <ToolCard
          title="Prompt Generator"
          description="Generate random prompts to spark creativity."
          :icon="Dice5"
          to="/tools/prompts"
        />
        <ToolCard
          title="Challenge Deck"
          description="Try daily or thematic creative challenges."
          :icon="BadgePlus"
          to="/tools/challenges"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import TodaysSpark from '../components/TodaysSpark.vue'
import ToolCard from '../components/ToolCard.vue'
import { Brain, Dice5, BadgePlus } from 'lucide-vue-next'
</script>
