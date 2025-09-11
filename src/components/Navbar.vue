<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <nav class="border-b">
    <div class="px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex items-center justify-between">
        <div class="text-2xl font-bold">VueX</div>

        <button
          class="inline-flex items-center justify-center rounded-md p-2 md:hidden"
          aria-label="Toggle navigation"
          @click="toggle"
        >
          <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="hidden md:flex gap-6 items-center">
          <a href="#" class="hover:underline">Products</a>
          <a href="#" class="hover:underline">Users</a>
        </div>
      </div>

      <div v-show="isOpen" class="md:hidden mt-4 space-y-2">
        <a href="#" class="block">Home</a>
        <a href="#" class="block">About</a>
        <a href="#" class="block">Contact</a>
      </div>
    </div>
  </nav>
</template>