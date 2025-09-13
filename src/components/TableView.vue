<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th v-for="header in headers" :key="header.key"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {{ header.label }}
          </th>
          <th v-if="actions.length > 0" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(item, index) in items" :key="index">
          <td v-for="header in headers" :key="header.key" class="px-6 py-4 whitespace-nowrap">
            <slot :name="`item-${header.key}`" :item="item">
              {{ item[header.key] }}
            </slot>
          </td>
          <td v-if="actions.length > 0" class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center">
            <button v-for="action in actions" :key="action.name" @click="action.handler(item)"
              :class="action.class || 'text-indigo-600 hover:text-red-600 mr-2 text-center cursor-pointer '">
              {{ action.name }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  actions: {
    type: Array,
    default: () => [],
  }
});
</script>

