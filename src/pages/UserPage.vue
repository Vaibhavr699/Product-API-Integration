<template>
  <div class="user-page">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 sm:px-8 gap-4">
  <h1
    class="text-2xl sm:text-4xl font-bold text-center sm:text-left underline underline-offset-2"
  >
    Users
  </h1>

  <div class="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-8">
    <button
      @click="openAddUserModal"
      class="bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg cursor-pointer flex items-center gap-2 hover:bg-green-700 transition w-full sm:w-auto justify-center"
    >
      <PlusIcon class="w-5 h-5 sm:w-6 sm:h-6" />
      <span class="text-sm sm:text-base">Add New User</span>
    </button>

    <div class="relative group">
      <div
        @click="toggleView"
        class="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition"
      >
        <Squares2X2Icon v-if="isCardView" class="w-6 h-6" />
        <ListBulletIcon v-else class="w-6 h-6" />
      </div>
      <div
        class="absolute bottom-full mb-2 left-1/6 -translate-x-1/2 bg-gray-800 text-white text-xs sm:text-sm rounded px-3 sm:px-6 py-1 opacity-0 z-50 group-hover:opacity-100 transition whitespace-nowrap"
      >
        {{ isCardView ? "Switch to Table View" : "Switch to Card View" }}
      </div>
    </div>
  </div>
</div>


    <div
      v-if="isCardView"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
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

        <ActionButtons
          :id="user.id"
          @view="viewUserPage"
          @edit="editUser"
          @delete="confirmDeleteUser"
        />
      </div>
    </div>

    <div v-else>
      <TableView
        :headers="tableHeaders"
        :items="users"
        :actions="tableActions"
      >
        <template #item-name="{ item }">
          {{ item.name.firstname }} {{ item.name.lastname }}
        </template>
      </TableView>
    </div>

    <DynamicModal
      :show="showAddEditUserModal"
      :title="isEditingUser ? 'Edit User' : 'Add New User'"
      :fields="userFields"
      :form-data="selectedUser"
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
import DynamicModal from "../components/DynamicModal.vue";
import DeleteConfirmModal from "../components/DeleteConfirmModal.vue";
import ActionButtons from "../components/ActionButtons.vue";
import TableView from "../components/TableView.vue";

import {
  PlusIcon,
  Squares2X2Icon,
  ListBulletIcon,
} from "@heroicons/vue/24/solid";

export default {
  name: "UserPage",
  components: {
    DynamicModal,
    DeleteConfirmModal,
    ActionButtons,
    TableView,
    PlusIcon,
    Squares2X2Icon,
    ListBulletIcon,
  },
  data() {
    return {
      selectedUser: null,
      showAddEditUserModal: false,
      isEditingUser: false,
      showDeleteConfirm: false,
      userIdToDelete: null,
      isCardView: true,
      userFields: [
        { id: "firstname", label: "First Name", type: "text", model: "name.firstname" },
        { id: "lastname", label: "Last Name", type: "text", model: "name.lastname" },
        { id: "username", label: "Username", type: "text", model: "username" },
        { id: "email", label: "Email", type: "email", model: "email" },
        { id: "phone", label: "Phone", type: "text", model: "phone" },
        { id: "website", label: "Website", type: "text", model: "website" },
      ],
      tableHeaders: [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
      ],
      tableActions: [
        { name: "View", handler: (item) => this.viewUserPage(item.id) },
        { name: "Edit", handler: (item) => this.editUser(item.id) },
        { name: "Delete", handler: (item) => this.confirmDeleteUser(item.id) },
      ],
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
      this.fetchUsers();
    },
    toggleView() {
      this.isCardView = !this.isCardView;
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>
