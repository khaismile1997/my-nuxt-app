<template>
  <div class="ct mt_3">
    <h2>Your Profile</h2>
    <button class="btn btn_danger" @click="onLogout">Logout</button>
  </div>
</template>

<script>
export default {
  middleware: ['check-auth', 'auth'],
  methods: {
    onLogout() {
      this.$store.dispatch('logout')
      this.$router.push('/')
    },
  },
}
</script>
