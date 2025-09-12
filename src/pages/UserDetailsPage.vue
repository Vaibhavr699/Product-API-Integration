<template>
  <div class="user-details-page p-4">
    <h1 class="text-3xl font-bold mb-4">User Details</h1>
    <div v-if="user" class="bg-white p-6 rounded shadow-lg">
      <h2 class="text-2xl font-semibold mb-2">{{ user.name.firstname }} {{ user.name.lastname }}</h2>
      <p class="text-gray-700 mb-1"><strong>Email:</strong> {{ user.email }}</p>
      <p class="text-gray-600 mb-1"><strong>Phone:</strong> {{ user.phone }}</p>
      <p class="text-gray-800 mb-4"><strong>Address:</strong> {{ user.address.street }}, {{ user.address.city }}, {{ user.address.zipcode }}</p>
      <button @click="$router.back()" class="bg-blue-500 text-white px-4 py-2 rounded mr-2 cursor-pointer">Back to Users</button>
      <button @click="confirmDeleteUser" class="bg-red-500 text-white px-4 py-2 rounded cursor-pointer">Delete User</button>
    </div>
    <div v-else>
      <p>Loading user details...</p>
    </div>

    <DeleteConfirmModal
      :show="showDeleteConfirm"
      message="Are you sure you want to delete this user?"
      @cancel="showDeleteConfirm = false"
      @confirm="deleteUser"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import DeleteConfirmModal from '../components/DeleteConfirmModal.vue'

export default {
  name: 'UserDetailsPage',
  components: {
    DeleteConfirmModal
  },
  props: ['id'],
  data() {
    return {
      user: null,
      showDeleteConfirm: false,
    }
  },
  methods: {
    ...mapActions('users', ['fetchUser', 'deleteUser']),
    async loadUser() {
      try {
        this.user = await this.fetchUser(this.id)
      } catch (error) {
        console.error('Error loading user:', error)
        this.user = null
      }
    },
    confirmDeleteUser() {
      this.showDeleteConfirm = true
    },
    async deleteUser() {
      try {
        await this.$store.dispatch('users/deleteUser', this.id)
        this.showDeleteConfirm = false
        this.$router.push({ name: 'Users' })
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    }
  },
  created() {
    this.loadUser()
  },
  watch: {
    id: 'loadUser'
  }
}
</script>
