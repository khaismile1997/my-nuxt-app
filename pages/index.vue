<template>
  <div class="ct">
    <event-alert class="mt_3" />
    <div class="banner">
      <div class="thumbnail-banner"></div>
    </div>
    <div class="popular-decks">
      <h3 class="text_center my_3">3 Popular decks for you</h3>
      <div class="r">
        <div class="c_4">
          <div class="card">Deck 1</div>
        </div>
        <div class="c_4">
          <div class="card">Deck 1</div>
        </div>
        <div class="c_4">
          <div class="card">Deck 1</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>

<style lang="scss">
.banner {
  height: 250px;
  margin-top: 3rem;
  .thumbnail-banner {
    background: url('~/assets/images/banner.webp') center center;
    height: inherit;
    background-size: cover;
  }
}
</style>
