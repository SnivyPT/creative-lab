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
        <RefreshCw :class="['w-4 h-4']" />
        Shuffle
      </button>
    </div>

    <!-- Spark Content with Fade -->
    <div class="relative min-h-[100px] mt-2">
      <transition name="fade" mode="out-in">
        <div v-if="!loading" :key="spark.quote" class="text-sm text-white">
          <p class="italic text-gray-300 mb-1">“{{ spark.quote }}”</p>
          <p class="text-sm text-gray-400 mb-3">— {{ spark.author }}</p>
          <div><strong>Challenge:</strong> {{ spark.challenge }}</div>
        </div>
      </transition>
      <!-- Spinner Overlay -->
      <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 rounded">
        <Spinner />
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue'
import { Flame, RefreshCw } from 'lucide-vue-next'
import { challenges } from '@/data/challenges'
import Spinner from './Spinner.vue'

export default {
  components: {
    Flame,
    RefreshCw,
    Spinner
  },
  data() {
    return {
      spark: { quote: '', author: '', challenge: '' },
      loading: false
    }
  },
  methods: {
    getTodayKey() {
      const today = new Date().toISOString().slice(0, 10)
      return `todaysSpark-${today}`
    },
    pickRandomChallenge() {
      return challenges[Math.floor(Math.random() * challenges.length)]
    },
    async fetchQuote() {
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
    },
    async shuffleSpark() {
      this.loading = true

      const [quoteData] = await Promise.all([
        this.fetchQuote(),
        new Promise(resolve => setTimeout(resolve, 2000))
      ])

      const challenge = this.pickRandomChallenge()

      this.spark = {
        quote: quoteData.quote,
        author: quoteData.author,
        challenge
      }

      localStorage.setItem(this.getTodayKey(), JSON.stringify(this.spark))
      this.loading = false
    },
    loadSpark() {
      const key = this.getTodayKey()
      const stored = localStorage.getItem(key)
      if (stored) {
        this.spark = JSON.parse(stored)
      } else {
        this.shuffleSpark()
      }
    }
  },
  mounted() {
    this.loadSpark()
  }
}
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
</style>
