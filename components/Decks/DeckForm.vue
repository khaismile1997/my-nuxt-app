<template>
  <form @submit.prevent="onSave">
    <div class="form_group">
      <label for="title">Title:</label>
      <input
        v-model="editedDeck.title"
        class="form_control"
        type="text"
        placeholder="Please enter title"
      />
    </div>
    <div class="form_group">
      <label for="description">Description:</label>
      <textarea
        v-model="editedDeck.description"
        class="form_control"
        name="description"
        placeholder="Please enter description"
      ></textarea>
    </div>
    <div class="form_group">
      <label for="thumbnail">Thumbnail:</label>
      <input
        v-model="editedDeck.thumbnail"
        class="form_control"
        type="text"
        name="thumbnail"
        placeholder="https://example.com/foo.png"
      />
      <div class="preview"></div>
    </div>
    <div class="form_group d_flex justify_content_end">
      <button class="btn btn_success" type="submit">
        {{ editedDeck && editedDeck.id ? 'Edit' : 'Create' }}
      </button>
      <button class="btn btn_danger ml_3" @click.prevent="closeModal">
        Close
      </button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    deck: {
      type: Object,
      required: false,
      default: () => ({
        name: '',
        description: '',
        thumbnail: '',
      }),
    },
  },
  data() {
    return {
      editedDeck: this.deck
        ? { ...this.deck }
        : {
            title: '',
            description: '',
            thumbnail: '',
          },
    }
  },
  methods: {
    closeModal() {
      this.$modal.close({ name: 'DeckFormModal' })
    },
    onSave() {
      this.$emit('submit', this.editedDeck)
    },
  },
}
</script>
