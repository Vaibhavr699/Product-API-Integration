<template>
  <div class="product-page">
    <div
      class="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 sm:px-8 gap-4"
    >
      <h1
        class="text-2xl sm:text-4xl font-bold text-center sm:text-left underline underline-offset-2"
      >
        Products
      </h1>

      <div class="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-8">
        <button
          @click="openAddProductModal"
          class="bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg cursor-pointer flex items-center gap-2 hover:bg-green-700 transition w-full sm:w-auto justify-center"
        >
          <PlusIcon class="w-5 h-5 sm:w-6 sm:h-6" />
          <span class="text-sm sm:text-base">Add New Product</span>
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
            {{ isCardView ? "Switch to Table View" : "Switch to Card View"  }} 
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="isCardView"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white p-4 rounded shadow"
      >
        <h2 class="text-xl font-semibold truncate">{{ product.title }}</h2>
        <p class="text-gray-700">Price: ${{ product.price }}</p>
        <p class="text-gray-600">Category: {{ product.category }}</p>
        <img
          :src="product.image"
          alt="Product Image"
          class="w-full h-48 object-contain mt-2"
        />
        <ActionButtons
          :id="product.id"
          @view="viewProductPage"
          @edit="editProduct"
          @delete="confirmDeleteProduct"
        />
      </div>
    </div>

    <div v-else>
      <TableView
        :headers="tableHeaders"
        :items="products"
        :actions="tableActions"
      >
        <template #item-image="{ item }">
          <img
            :src="item.image"
            alt="Product Image"
            class="w-16 h-16 object-contain"
          />
        </template>
      </TableView>
    </div>

    <DynamicModal
      :show="showAddEditProductModal"
      :title="isEditingProduct ? 'Edit Product' : 'Add New Product'"
      :fields="productFields"
      :form-data="selectedProduct"
      @close="showAddEditProductModal = false"
      @save="saveProduct"
    />

    <DeleteConfirmModal
      :show="showDeleteConfirm"
      message="Are you sure you want to delete this product?"
      @cancel="showDeleteConfirm = false"
      @confirm="deleteProduct"
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
  name: "ProductPage",
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
      selectedProduct: null,
      showAddEditProductModal: false,
      isEditingProduct: false,
      showDeleteConfirm: false,
      productIdToDelete: null,
      isCardView: true,
      productFields: [
        { id: "title", label: "Title", type: "text", model: "title" },
        { id: "price", label: "Price", type: "number", model: "price" },
        {
          id: "description",
          label: "Description",
          type: "textarea",
          model: "description",
        },
        { id: "category", label: "Category", type: "text", model: "category" },
        { id: "image", label: "Image Upload", type: "file", model: "image" },
      ],
      tableHeaders: [
        { key: "id", label: "ID" },
        { key: "title", label: "Title" },
        { key: "price", label: "Price" },
        { key: "category", label: "Category" },
        { key: "image", label: "Image" },
      ],
      tableActions: [
        { name: "View", handler: (item) => this.viewProductPage(item.id) },
        { name: "Edit", handler: (item) => this.editProduct(item.id) },
        {
          name: "Delete",
          handler: (item) => this.confirmDeleteProduct(item.id),
        },
      ],
    };
  },
  computed: {
    ...mapState({
      products: (state) => state.products.products,
    }),
  },
  methods: {
    ...mapActions("products", [
      "fetchProducts",
      "fetchProduct",
      "addProduct",
      "updateProduct",
      "deleteProduct",
    ]),
    viewProductPage(id) {
      this.$router.push({ name: "ProductDetails", params: { id } });
    },
    openAddProductModal() {
      this.isEditingProduct = false;
      this.showAddEditProductModal = true;
    },
    async editProduct(id) {
      this.isEditingProduct = true;
      const fetchedProduct = await this.fetchProduct(id);
      this.selectedProduct = fetchedProduct || {};
      this.showAddEditProductModal = true;
    },
    async saveProduct(productData) {
      if (this.isEditingProduct) {
        await this.updateProduct(productData);
      } else {
        await this.addProduct(productData);
      }
      this.showAddEditProductModal = false;
    },
    confirmDeleteProduct(id) {
      this.productIdToDelete = id;
      this.showDeleteConfirm = true;
    },
    async deleteProduct() {
      await this.$store.dispatch(
        "products/deleteProduct",
        this.productIdToDelete
      );
      this.showDeleteConfirm = false;
      this.productIdToDelete = null;
      this.fetchProducts();
    },
    toggleView() {
      this.isCardView = !this.isCardView;
    },
  },
  created() {
    this.fetchProducts();
  },
};
</script>
