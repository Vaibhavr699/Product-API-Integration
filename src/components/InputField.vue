<template>
  <div class="mb-4 w-full">
    <label
      :for="id"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
    </label>

    <input
      v-if="type !== 'textarea'"
      :type="type"
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 sm:text-sm
             focus:border-green-500 focus:ring-2 focus:ring-green-400 outline-none transition"
    />

    <textarea
      v-else
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      rows="4"
      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 sm:text-sm
             focus:border-green-500 focus:ring-2 focus:ring-green-400 outline-none transition resize-y"
    ></textarea>
  </div>
</template>


<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  id: String,
  label: String,
  modelValue: [String, Number],
  type: { 
    type: String,
    default: 'text'
  },
});

defineEmits(['update:modelValue']);
</script>
