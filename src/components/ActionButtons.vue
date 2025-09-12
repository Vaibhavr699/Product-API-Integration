<template>
  <div class="mt-4 flex justify-end">
    <button @click="$emit('view', id)" class="bg-blue-500 text-white px-4 py-2 rounded mr-2 cursor-pointer">View</button>
    <button @click="$emit('edit', id)" class="bg-yellow-500 text-white px-4 py-2 rounded mr-2 cursor-pointer">Edit</button>
    <button @click="$emit('delete', id)" class="bg-red-500 text-white px-4 py-2 rounded cursor-pointer">Delete</button>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  }
}
</script>
