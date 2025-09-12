const API_BASE = import.meta.env.VITE_API_BASE_URL + '/api'

const productStore = {
  namespaced: true,
  state: {
    products: [],
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    ADD_PRODUCT(state, product) {
      state.products.push(product)
    },
    UPDATE_PRODUCT(state, updatedProduct) {
      const index = state.products.findIndex(p => p.id === updatedProduct.id)
      if (index !== -1) {
        state.products.splice(index, 1, updatedProduct)
      }
    },
    DELETE_PRODUCT(state, productId) {
      state.products = state.products.filter(p => p.id !== productId)
    },
  },
  actions: {
    //fetching all products here
    async fetchProducts({ commit }) {
      try {
        const response = await fetch(`${API_BASE}/products`)
        const products = await response.json()
        
        commit('SET_PRODUCTS', products)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },
    //by id
    async fetchProduct({ commit }, id) {
      try {
        const response = await fetch(`${API_BASE}/products/${id}`)
        const product = await response.json()
        
        return product
      } catch (error) {
        throw error
      }
    },

    // to add products POST
    async addProduct({ commit }, productData) {
      try {
        const response = await fetch(`${API_BASE}/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        })
        const newProduct = await response.json()
        
        commit('ADD_PRODUCT', newProduct)
        return newProduct
      } catch (error) {
        throw error
      }
    },

    //to update product PUT
    async updateProduct({ commit }, { id, ...productData }) {
      try {
        const response = await fetch(`${API_BASE}/products/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        })
        const updatedProduct = await response.json()
        
        commit('UPDATE_PRODUCT', updatedProduct)
        return updatedProduct
      } catch (error) {
        throw error
      }
    },

    //to delete product DELETE
    async deleteProduct({ commit }, id) {
      try {
        await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' })
        commit('DELETE_PRODUCT', id)
      } catch (error) {
        throw error
      }
    }
  },
  getters: {
    getProductById: (state) => (id) => {
      return state.products.find(p => p.id === id)
    }
  }
}

export default productStore