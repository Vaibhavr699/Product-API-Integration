<template>
  <div class="product-page">
    <div class="flex justify-between px-8">
      <h1
        class="text-4xl font-bold mb-4 text-center underline underline-offset-2"
      >
        Products
      </h1>
      <button
        @click="openAddProductModal"
        class="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg cursor-pointer"
      >
        Add New Product
      </button>
      <!-- <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="{1.5}"
        stroke="currentColor"
        className="size-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99"
        />
      </svg> -->
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white p-4 rounded shadow"
      >
        <h2 class="text-xl font-semibold">{{ product.title }}</h2>
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

    <ProductModal
      :show="showAddEditProductModal"
      :product="isEditingProduct ? selectedProduct : null"
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
import ProductModal from "../components/ProductModal.vue";
import DeleteConfirmModal from "../components/DeleteConfirmModal.vue";
import ActionButtons from "../components/ActionButtons.vue";

export default {
  name: "ProductPage",
  components: {
    ProductModal,
    DeleteConfirmModal,
    ActionButtons,
  },
  data() {
    return {
      selectedProduct: null,
      showAddEditProductModal: false,
      isEditingProduct: false,
      showDeleteConfirm: false,
      productIdToDelete: null,
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
      this.selectedProduct = await this.fetchProduct(id);
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
  },
  created() {
    this.fetchProducts();
  },
};
</script>
