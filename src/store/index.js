import { createStore } from 'vuex'
import productStore from './productStore'
import userStore from './userStore'

export default createStore({
  modules: {
    products: productStore,
    users: userStore
  }
})
