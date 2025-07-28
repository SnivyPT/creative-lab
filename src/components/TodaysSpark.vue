<template>
  <section class="bg-gray-800 border border-emerald-500 p-4 mb-6 rounded-xl shadow-md text-white">
    <!-- Header: Title + Shuffle -->
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-2">
        <Flame class="w-5 h-5 text-rose-400" />
        <h2 class="text-lg font-semibold text-emerald-400">Today’s Spark</h2>
      </div>
      <button
        @click="shuffleSpark"
        class="flex items-center gap-1 px-3 py-1 text-sm bg-emerald-600 hover:bg-emerald-700 rounded shadow"
        :disabled="loading"
      >
        <RefreshCw :class="['w-4 h-4', loading ? 'animate-spin' : '']" />
        Shuffle
      </button>
    </div>

    <!-- Spark Content with Fade -->
    <transition name="fade" mode="out-in">
      <div :key="spark.quote" class="text-sm text-white">
        <p class="italic text-gray-300 mb-1">“{{ spark.quote }}”</p>
        <p class="text-sm text-gray-400 mb-3">— {{ spark.author }}</p>
        <div><strong>Challenge:</strong> {{ spark.challenge }}</div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Flame, RefreshCw } from 'lucide-vue-next'
import { challenges } from '@/data/challenges'

const spark = ref({ quote: '', author: '', challenge: '' })
const loading = ref(false)

function getTodayKey() {
  const today = new Date().toISOString().slice(0, 10)
  return `todaysSpark-${today}`
}

function pickRandomChallenge() {
  return challenges[Math.floor(Math.random() * challenges.length)]
}

async function fetchQuote() {
  try {
    const res = await fetch('http://api.quotable.io/random?tags=inspirational|motivational|creativity|perseverance')
    if (!res.ok) throw new Error('API error')
    const data = await res.json()
    return { quote: data.content, author: data.author }
  } catch {
    return {
      quote: "Inspiration is everywhere — even when offline.",
      author: "Creative Lab"
    }
  }
}

async function shuffleSpark() {
  loading.value = true
  const quoteData = await fetchQuote()
  const challenge = pickRandomChallenge()

  spark.value = {
    quote: quoteData.quote,
    author: quoteData.author,
    challenge
  }

  localStorage.setItem(getTodayKey(), JSON.stringify(spark.value))
  loading.value = false
}

function loadSpark() {
  const key = getTodayKey()
  const stored = localStorage.getItem(key)
  if (stored) {
    spark.value = JSON.parse(stored)
  } else {
    shuffleSpark()
  }
}

onMounted(loadSpark)
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
