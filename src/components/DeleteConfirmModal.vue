<template>
  <div v-if="show" class="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-lg">
      <p class="text-lg mb-4">{{ message }}</p>
      <div class="flex justify-end">
        <button @click="$emit('cancel')" class="bg-gray-800 text-white px-4 py-2 rounded mr-2 cursor-pointer">Cancel</button>
        <button @click="$emit('confirm')" class="bg-red-500 text-white px-4 py-2 rounded cursor-pointer">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  show: Boolean,
  message: String,
});

defineEmits(['cancel', 'confirm']);
</script>
