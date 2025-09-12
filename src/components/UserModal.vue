<template>
  <div v-if="show" class="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-lg w-1/2">
      <h2 class="text-2xl font-bold mb-4">{{ isEditingUser ? 'Edit User' : 'Add New User' }}</h2>
      <form @submit.prevent="saveUser">
        <div class="mb-4">
          <label for="firstname" class="block text-gray-700">First Name</label>
          <input type="text" id="firstname" v-model="userForm.name.firstname" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
        </div>
        <div class="mb-4">
          <label for="lastname" class="block text-gray-700">Last Name</label>
          <input type="text" id="lastname" v-model="userForm.name.lastname" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
        </div>
        <div class="mb-4">
          <label for="username" class="block text-gray-700">Username</label>
          <input type="text" id="username" v-model="userForm.username" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700">Email</label>
          <input type="email" id="email" v-model="userForm.email" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
        </div>
        <div class="mb-4">
          <label for="phone" class="block text-gray-700">Phone</label>
          <input type="text" id="phone" v-model="userForm.phone" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
        </div>
        <div class="mb-4">
          <label for="website" class="block text-gray-700">Website</label>
          <input type="text" id="website" v-model="userForm.website" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
        </div>
        <div class="flex justify-end">
          <button type="button" @click="$emit('close')" class="bg-gray-500 text-white px-4 py-2 rounded mr-2 cursor-pointer">Cancel</button>
          <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded cursor-pointer">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  show: Boolean,
  user: Object,
});

const emit = defineEmits(['close', 'save']);

const isEditingUser = ref(false);
const userForm = ref({
  name: { firstname: '', lastname: '' },
  username: '',
  email: '',
  phone: '',
  website: '',
});

watch(() => props.show, (newVal) => {
  if (newVal && props.user) {
    isEditingUser.value = true;
    userForm.value = { ...props.user, name: { ...props.user.name } };
  } else {
    isEditingUser.value = false;
    userForm.value = {
      name: { firstname: '', lastname: '' },
      username: '',
      email: '',
      phone: '',
      website: '',
    };
  }
});

const saveUser = () => {
  emit('save', userForm.value);
};
</script>

<style scoped>
/* Add any specific styles for the modal here */
</style>

