<template>
  <main class="main">
    <h3>Deck setting</h3>
  </main>
</template>

<script>
export default {
  middleware: ['check-auth', 'auth'],
}
</script>

<style lang="scss">
.main {
  margin-left: 3rem;
}
</style>
