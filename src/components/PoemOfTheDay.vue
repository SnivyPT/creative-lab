<template>
  <section class="bg-gray-800 border border-emerald-500 p-4 mb-6 rounded-xl shadow-md text-white">
    <!-- Header: Title + Refresh -->
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-2">
        <span class="text-emerald-300 text-xl">📜</span>
        <h2 class="text-lg font-semibold text-emerald-400">Poem A Day</h2>
      </div>
      <button
        @click="refreshPoem"
        class="flex items-center gap-1 px-3 py-1 text-sm bg-emerald-600 hover:bg-emerald-700 rounded shadow"
        :disabled="loading"
      >
        <RefreshCw :class="['w-4 h-4']" />
        Shuffle
      </button>
    </div>

    <!-- Poem Content or Spinner -->
    <div class="relative min-h-[100px] mt-2">
      <transition name="fade" mode="out-in">
        <div v-if="!loading" :key="poem.title" class="text-sm">
          <p class="text-emerald-300 italic mb-1">“{{ poem.title }}”</p>
          <p class="mb-2 whitespace-pre-line">{{ poem.content }}</p>
          <p class="text-right text-gray-400">— {{ poem.author }}</p>
        </div>
      </transition>
      <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 rounded">
        <Spinner />
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue'
import { RefreshCw } from 'lucide-vue-next'
import Spinner from '@/components/Spinner.vue'

export default {
  components: {
    RefreshCw,
    Spinner,
  },
  data() {
    return {
      poem: { content: '', author: '' },
      loading: false,
    }
  },
  computed: {
    poemLines() {
      return this.poem.content.split('\n')
    },
  },
  methods: {
    async fetchPoem() {
      this.loading = true
      try {
        //https://www.poemist.com/
        const [response] = await Promise.all([
            fetch('https://poetrydb.org/random'),
            new Promise(resolve => setTimeout(resolve, 2000))
        ])
        const data = await response.json()
        this.poem = {
          content: data[0].lines.join('\n'),
          author: data[0].author,
        }
      } catch (e) {
        this.poem = {
          content: 'Words escape me today, but your soul knows where to begin.',
          author: 'Creative Lab',
        }
      } finally {
        this.loading = false
      }
    },
    refreshPoem() {
      this.fetchPoem()
    },
  },
  mounted() {
    this.fetchPoem()
  },
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
