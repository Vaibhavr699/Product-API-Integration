<template>
  <div class="product-details-page p-4">
    <h1 class="text-3xl font-bold mb-4">Product Details</h1>
    <div v-if="product" class="bg-white p-6 rounded shadow-lg">
      <h2 class="text-2xl font-semibold mb-2">{{ product.title }}</h2>
      <p class="text-gray-700 mb-1"><strong>Price:</strong> ${{ product.price }}</p>
      <p class="text-gray-600 mb-1"><strong>Category:</strong> {{ product.category }}</p>
      <p class="text-gray-800 mb-4"><strong>Description:</strong> {{ product.description }}</p>
      <img :src="product.image" alt="Product Image" class="w-full h-64 object-contain mb-4">
      <button @click="$router.back()" class="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">Back to Products</button>
    </div>
    <div v-else>
      <p>Loading product details...</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ProductDetailsPage',
  props: ['id'],
  data() {
    return {
      product: null
    }
  },
  methods: {
    ...mapActions('products', ['fetchProduct']),
    async loadProduct() {
      try {
        this.product = await this.fetchProduct(this.id)
      } catch (error) {
        console.error('Error loading product:', error)
        this.product = null 
      }
    }
  },
  created() {
    this.loadProduct()
  },
  watch: {
    id: 'loadProduct' 
  }
}
</script>
