<template>
  <div>
    <default-header />
    <Nuxt />
    <!-- Modal Create or Edit -->
    <!-- Modal Create or Edit -->
    <!-- TODO -->
    <v-modal v-slot="payload" name="DeckFormModal">
      <div class="modal-body">
        <h2>
          {{ payload && payload.payload ? 'Edit a deck' : 'Create a new Deck' }}
        </h2>
        <deck-form :deck="payload.payload" @submit="onSubmit" />
      </div>
    </v-modal>
    <default-footer />
  </div>
</template>

<script>
import DeckForm from '@/components/Decks/DeckForm.vue'
import DefaultHeader from '~/components/Header/DefaultHeader.vue'
import DefaultFooter from '~/components/Footer/DefaultFooter.vue'
export default {
  components: {
    DeckForm,
    DefaultHeader,
    DefaultFooter,
  },
  methods: {
    onSubmit(deckData) {
      if (deckData && deckData.id) {
        this.$store.dispatch('editDeck', deckData).then(() => {
          this.$modal.close({ name: 'DeckFormModal' })
          this.$router.push('/decks')
        })
      } else {
        this.$store
          .dispatch('addDeck', deckData)
          .then(() => this.$modal.close({ name: 'DeckFormModal' }))
      }
    },
  },
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
</style>
