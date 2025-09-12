<template>
  <div class="user-page">
    <div class="flex justify-between px-8">
      <h1
        class="text-4xl font-bold mb-4 text-center underline underline-offset-2"
      >
        Users
      </h1>
      <button
        @click="openAddUserModal"
        class="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg cursor-pointer"
      >
        Add New User
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="user in users"
        :key="user.id"
        class="bg-white p-4 rounded shadow"
      >
        <h2 class="text-xl font-semibold">
          {{ user.name && user.name.firstname + " " + user.name.lastname }}
        </h2>
        <p class="text-gray-700">Email: {{ user.email }}</p>
        <p class="text-gray-600">Phone: {{ user.phone }}</p>
        <div class="mt-4 flex justify-end">
          <ActionButtons
            :id="user.id"
            @view="viewUserPage"
            @edit="editUser"
            @delete="confirmDeleteUser"
          />
        </div>
      </div>
    </div>

    <UserModal
      :show="showAddEditUserModal"
      :user="isEditingUser ? selectedUser : null"
      @close="showAddEditUserModal = false"
      @save="saveUser"
    />

    <DeleteConfirmModal
      :show="showDeleteConfirm"
      message="Are you sure you want to delete this user?"
      @cancel="showDeleteConfirm = false"
      @confirm="deleteUser"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import UserModal from "../components/UserModal.vue";
import DeleteConfirmModal from "../components/DeleteConfirmModal.vue";
import ActionButtons from "../components/ActionButtons.vue";

export default {
  name: "UserPage",
  components: {
    UserModal,
    DeleteConfirmModal,
    ActionButtons,
  },
  data() {
    return {
      selectedUser: null,
      showAddEditUserModal: false,
      isEditingUser: false,
      showDeleteConfirm: false,
      userIdToDelete: null,
    };
  },
  computed: {
    ...mapState({
      users: (state) => state.users.users,
    }),
  },
  methods: {
    ...mapActions("users", [
      "fetchUsers",
      "fetchUser",
      "addUser",
      "updateUser",
      "deleteUser",
    ]),
    viewUserPage(id) {
      this.$router.push({ name: "UserDetails", params: { id } });
    },
    openAddUserModal() {
      this.isEditingUser = false;
      this.showAddEditUserModal = true;
      console.log("user modal");
    },
    async editUser(id) {
      this.isEditingUser = true;
      this.selectedUser = await this.fetchUser(id);
      this.showAddEditUserModal = true;
    },
    async saveUser(userData) {
      if (this.isEditingUser) {
        await this.updateUser(userData);
      } else {
        await this.addUser(userData);
      }
      this.showAddEditUserModal = false;
      this.fetchUsers();
    },
    confirmDeleteUser(id) {
      this.userIdToDelete = id;
      this.showDeleteConfirm = true;
    },
    async deleteUser() {
      await this.$store.dispatch("users/deleteUser", this.userIdToDelete);
      this.showDeleteConfirm = false;
      this.userIdToDelete = null;
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>
