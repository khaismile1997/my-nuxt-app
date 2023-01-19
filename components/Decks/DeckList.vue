<template>
  <li>
    <nuxt-link class="deck" :to="`/decks/${id}`">
      <div class="card decks-card">
        <img :src="thumbnail" />
        <div class="card_body">
          <h3>{{ title }}</h3>
          <p>{{ description }}</p>
        </div>
      </div>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
  },
}
</script>
