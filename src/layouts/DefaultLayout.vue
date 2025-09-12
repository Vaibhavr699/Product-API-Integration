<template>
  <div>
    <Navbar />
    <main class="container mx-auto mt-4">
      <slot />
    </main>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'DefaultLayout',
  components: {
    Navbar
  }
}
</script>


