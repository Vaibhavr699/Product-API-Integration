<script setup>
import { ref } from "vue";
import { CubeIcon, UserIcon, Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { useRouter } from 'vue-router'

const router = useRouter()
const isOpen = ref(false);

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const navigateTo = (path) => {
  router.push(path)
  isOpen.value = false
}
</script>

<template>
  <nav class="border-b bg-white shadow-sm sticky top-0 z-50">
    <div class="px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex items-center justify-between">
        <div class="text-2xl font-bold text-blue-700 cursor-pointer" @click="navigateTo('/')">
          API Integration
        </div>

        <button
          class="inline-flex items-center justify-center rounded-md p-2 md:hidden"
          aria-label="Toggle navigation"
          @click="toggle"
        >
          <Bars3Icon v-if="!isOpen" class="h-6 w-6" />
          <XMarkIcon v-else class="h-6 w-6" />
        </button>

        <div class="hidden md:flex gap-6 items-center">
          <a
            @click="navigateTo('/products')"
            class="flex items-center cursor-pointer gap-2 hover:underline hover:scale-105 transition-transform"
          >
            <CubeIcon class="w-5 h-5" />
            Products
          </a>

          <a
            @click="navigateTo('/users')"
            class="flex items-center gap-2 cursor-pointer hover:underline hover:scale-105 transition-transform"
          >
            <UserIcon class="w-5 h-5" />
            Users
          </a>
        </div>
      </div>

      <div v-show="isOpen" class="md:hidden mt-4 space-y-2">
        <a @click="navigateTo('/products')" class="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
          <CubeIcon class="w-5 h-5" />
          Products
        </a>
        <a @click="navigateTo('/users')" class="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded">
          <UserIcon class="w-5 h-5" />
          Users
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
/* Add any component specific styles here */
</style>
