const API_BASE = import.meta.env.VITE_API_BASE_URL + '/api'

const userStore = {
  namespaced: true,
  state: {
    users: []
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users
    },
    ADD_USER(state, user) {
      state.users.push(user)
    },
    UPDATE_USER(state, updatedUser) {
      const index = state.users.findIndex(u => u.id === updatedUser.id)
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser)
      }
    },
    DELETE_USER(state, id) {
      state.users = state.users.filter(u => u.id !== id)
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const response = await fetch(`${API_BASE}/users`)
        const users = await response.json()
        
        commit('SET_USERS', users)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    },
    async fetchUser({ commit }, id) {
      try {
        const response = await fetch(`${API_BASE}/users/${id}`)
        const user = await response.json()
        
        return user
      } catch (error) {
        throw error
      }
    },
    async addUser({ commit }, userData) {
      try {
        const response = await fetch(`${API_BASE}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        })
        const newUser = await response.json()
        
        commit('ADD_USER', newUser)
        return newUser
      } catch (error) {
        throw error
      }
    },
    async updateUser({ commit }, { id, ...userData }) {
      try {
        const response = await fetch(`${API_BASE}/users/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        })
        const updatedUser = await response.json()
        
        commit('UPDATE_USER', updatedUser)
        return updatedUser
      } catch (error) {
        throw error
      }
    },
    async deleteUser({ commit }, id) {
      try {
        await fetch(`${API_BASE}/users/${id}`, { method: 'DELETE' })
        commit('DELETE_USER', id)
      } catch (error) {
        throw error
      }
    }
  },
  getters: {
    getUserById: (state) => (id) => {
      return state.users.find(u => u.id === id)
    }
  }
}

export default userStore