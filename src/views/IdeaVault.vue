<template>
  <div class="text-white">
    <h2 class="text-2xl font-semibold mb-6 text-emerald-400 flex items-center gap-2">
      <Brain class="w-6 h-6" /> Idea Vault
    </h2>

    <!-- Tag Filter Bar -->
    <div v-if="allTags.length" class="mb-6 flex flex-wrap gap-2">
      <button
        @click="activeTag = null"
        :class="['px-3 py-1 rounded-full text-sm transition', activeTag === null ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600']"
      >
        All
      </button>
      <button
        v-for="(tag, index) in allTags"
        :key="index"
        @click="activeTag = tag"
        :class="['px-3 py-1 rounded-full text-sm transition', activeTag === tag ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600']"
      >
        {{ tag }}
      </button>
    </div>

    <!-- Pinned Ideas Banner -->
    <div v-if="pinnedIdeas.length" class="mb-6">
      <h3 class="text-xl font-semibold mb-2">📌 Pinned Ideas</h3>
      <div ref="pinnedScroll" class="flex gap-4 overflow-x-auto scrollbar-custom pb-1" @wheel.prevent="handleHorizontalScroll">
        <div
          v-for="(idea, index) in pinnedIdeas"
          :key="index"
          class="min-w-[160px] max-w-[200px] bg-gray-800 rounded-xl p-3 shadow-md relative hover:ring-2 hover:ring-emerald-400 transition cursor-pointer m-2"
          @click="openIdea(idea)"
        >
          <!-- <button
            @click.stop="togglePin(idea)"
            class="absolute top-2 right-2 text-emerald-400 hover:text-emerald-300"
          >
            <Pin :fill="idea.pinned ? 'currentColor' : 'none'" class="w-4 h-4" />
          </button> -->
          <h4 class="font-semibold text-sm truncate pr-4">{{ idea.title }}</h4>
        </div>
      </div>
    </div>

    <!-- Idea Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Add New Idea Card First -->
      <div
        @click="showForm = true"
        class="border-2 border-dashed border-gray-600 rounded-2xl flex items-center justify-center text-3xl text-gray-400 hover:border-emerald-400 cursor-pointer h-40"
      >
        +
      </div>

      <!-- Idea Cards -->
      <div
        v-for="(idea, index) in filteredIdeas"
        :key="index"
        @click="openIdea(idea)"
        class="bg-gray-800 rounded-2xl p-4 shadow-md hover:ring-2 hover:ring-emerald-400 cursor-pointer transition h-40 flex flex-col justify-between relative"
      >
        <button
          @click.stop="togglePin(idea)"
          class="absolute top-2 right-2 text-emerald-400 hover:text-emerald-300"
        >
          <Pin :fill="idea.pinned ? 'currentColor' : 'none'" class="w-4 h-4" />
        </button>
        <div>
          <h3 class="text-lg font-bold truncate">{{ idea.title }}</h3>
          <p class="text-sm text-gray-300">{{ truncate(idea.description) }}</p>
        </div>
        <div class="mt-2 flex flex-wrap gap-1">
          <span
            v-for="(tag, i) in idea.tags || []"
            :key="i"
            class="bg-gray-700 text-xs px-2 py-0.5 rounded text-gray-300"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <!-- Add Idea Modal -->
    <div
      v-if="showForm"
      class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    >
      <div class="bg-gray-900 p-6 rounded-xl w-full max-w-lg relative">
        <button
          @click="showForm = false"
          class="absolute top-2 right-3 text-gray-400 hover:text-white"
        >
          <X class="w-5 h-5" />
        </button>
        <h3 class="text-2xl font-bold mb-4 flex items-center gap-2">
          <PlusCircle class="w-6 h-6 text-emerald-400" /> New Idea
        </h3>
        <input
          v-model="newIdea.title"
          type="text"
          placeholder="Title"
          class="w-full px-4 py-2 rounded bg-gray-700 text-white mb-3 focus:outline-none"
        />
        <textarea
          v-model="newIdea.description"
          placeholder="Description"
          rows="4"
          class="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none mb-3"
        ></textarea>
        <div>
          <input
            v-model="tagInput"
            @keydown.enter.prevent="addNewTag"
            type="text"
            placeholder="Press Enter to add tag"
            class="w-full px-4 py-2 rounded bg-gray-700 text-white mb-2 focus:outline-none"
          />
          <div class="flex flex-wrap gap-1 mb-3">
            <span
              v-for="(tag, i) in newIdea.tags"
              :key="i"
              class="bg-gray-700 text-xs px-2 py-0.5 rounded text-gray-300 flex items-center gap-1"
            >
              {{ tag }}
              <button @click.stop="removeNewTag(i)" class="text-gray-400 hover:text-red-500">×</button>
            </span>
          </div>
        </div>
        <div class="mt-4 flex justify-end gap-2">
          <button
            @click="addIdea"
            class="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded text-white"
          >
            Save
          </button>
          <button
            @click="showForm = false"
            class="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- View Idea Modal -->
    <div
      v-if="selectedIdea"
      class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    >
      <div class="bg-gray-900 p-6 rounded-xl w-full max-w-lg relative">
        <button
          @click="selectedIdea = null"
          class="absolute top-2 right-3 text-gray-400 hover:text-white transition"
        >
          <X class="w-5 h-5" />
        </button>
        <h3 class="text-2xl font-bold mb-2">{{ selectedIdea.title }}</h3>
        <p class="text-gray-300 whitespace-pre-wrap">{{ selectedIdea.description }}</p>
        <div class="mt-4 flex flex-wrap gap-1">
          <span
            v-for="(tag, i) in selectedIdea.tags || []"
            :key="i"
            class="bg-gray-700 text-xs px-2 py-0.5 rounded text-gray-300"
          >
            {{ tag }}
          </span>
        </div>
        <div class="mt-6 flex justify-end gap-2">
          <button
            @click="deleteIdea(ideas.indexOf(selectedIdea))"
            class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white flex items-center gap-1"
          >
            <Trash class="w-4 h-4" />
            Delete
          </button>
          <button
            @click="startEditingIdea(selectedIdea)"
            class="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded text-white flex items-center gap-1"
          >
            <Pencil class="w-4 h-4" />
            Edit
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Idea Modal -->
    <div
      v-if="isEditing"
      class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
    >
      <div class="bg-gray-900 p-6 rounded-xl w-full max-w-lg relative">
        <button
          @click="isEditing = false"
          class="absolute top-2 right-3 text-gray-400 hover:text-white"
        >
          <X class="w-5 h-5" />
        </button>
        <h3 class="text-2xl font-bold mb-4 flex items-center gap-2">
          <Pencil class="w-6 h-6 text-emerald-400" /> Edit Idea
        </h3>
        <input
          v-model="editTitle"
          type="text"
          placeholder="Title"
          class="w-full px-4 py-2 rounded bg-gray-700 text-white mb-3 focus:outline-none"
        />
        <textarea
          v-model="editDescription"
          placeholder="Description"
          rows="4"
          class="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none mb-3"
        ></textarea>
        <input
          v-model="editTagInput"
          @keydown.enter.prevent="addEditTag"
          type="text"
          placeholder="Press Enter to add tag"
          class="w-full px-4 py-2 rounded bg-gray-700 text-white mb-2 focus:outline-none"
        />
        <div class="flex flex-wrap gap-1 mb-3">
          <span
            v-for="(tag, i) in editTags"
            :key="i"
            class="bg-gray-700 text-xs px-2 py-0.5 rounded text-gray-300 flex items-center gap-1"
          >
            {{ tag }}
            <button @click.stop="removeEditTag(i)" class="text-gray-400 hover:text-red-500">×</button>
          </span>
        </div>
        <div class="mt-4 flex justify-end gap-2">
          <button
            @click="saveEditedIdea"
            class="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded text-white"
          >
            Save
          </button>
          <button
            @click="isEditing = false"
            class="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, watch } from 'vue'
  import { Brain, PlusCircle, X, Trash, Pencil, Pin } from 'lucide-vue-next'

  const STORAGE_KEY = 'idea-vault'
  const ideas = ref([])
  const showForm = ref(false)
  const selectedIdea = ref(null)
  const newIdea = ref({ title: '', description: '', tags: [], pinned: false })
  const tagInput = ref('')
  const pinnedScroll = ref(null)

  const pinnedIdeas = computed(() => ideas.value.filter(i => i.pinned))
  const activeTag = ref(null)
  const allTags = computed(() => [...new Set(ideas.value.flatMap(i => i.tags || []))])
  const filteredIdeas = computed(() => {
    if (!activeTag.value) return ideas.value
    return ideas.value.filter(i => i.tags && i.tags.includes(activeTag.value))
  })

  const isEditing = ref(false)
  const editIndex = ref(null)
  const editTitle = ref('')
  const editDescription = ref('')
  const editTags = ref([])
  const editTagInput = ref('')

  function loadIdeas() {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      ideas.value = JSON.parse(saved)
    }
  }

  function saveIdeas() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas.value))
  }

  function addIdea() {
    if (!newIdea.value.title.trim()) return
    ideas.value.unshift({ ...newIdea.value })
    newIdea.value = { title: '', description: '', tags: [] }
    tagInput.value = ''
    showForm.value = false
  }

  function openIdea(idea) {
    selectedIdea.value = idea
  }

  function truncate(text) {
    return text.length > 100 ? text.slice(0, 100) + '…' : text
  }

  function deleteIdea(index) {
    if (confirm('Are you sure you want to delete this idea?')) {
      ideas.value.splice(index, 1)
      selectedIdea.value = null
    }
  }

  function addNewTag() {
    const tag = tagInput.value.trim()
    if (tag && !newIdea.value.tags.includes(tag)) {
      newIdea.value.tags.push(tag)
    }
    tagInput.value = ''
  }

  function removeNewTag(index) {
    newIdea.value.tags.splice(index, 1)
  }

  function startEditingIdea(idea) {
    editIndex.value = ideas.value.indexOf(idea)
    editTitle.value = idea.title
    editDescription.value = idea.description
    editTags.value = [...(idea.tags || [])]
    editTagInput.value = ''
    isEditing.value = true
    selectedIdea.value = null
  }

  function addEditTag() {
    const tag = editTagInput.value.trim()
    if (tag && !editTags.value.includes(tag)) {
      editTags.value.push(tag)
    }
    editTagInput.value = ''
  }

  function removeEditTag(index) {
    editTags.value.splice(index, 1)
  }

  function saveEditedIdea() {
    if (editTitle.value.trim()) {
      ideas.value[editIndex.value] = {
        ...ideas.value[editIndex.value],
        title: editTitle.value.trim(),
        description: editDescription.value.trim(),
        tags: [...editTags.value],
      }
      isEditing.value = false
      editTitle.value = ''
      editDescription.value = ''
      editTags.value = []
      editTagInput.value = ''
    }
  }

  function togglePin(idea) {
    idea.pinned = !idea.pinned
    saveIdeas()
  }

  function handleHorizontalScroll(e) {
    const el = pinnedScroll.value
    if (!el) return
    el.scrollLeft += e.deltaY
  }

  watch(ideas, saveIdeas, { deep: true })
  onMounted(loadIdeas)
</script>
