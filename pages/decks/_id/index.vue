<template>
  <section>
    <div class="r">
      <div class="ct text_center">
        <h3>Deck: {{ deck.title }}</h3>
        <div class="tools">
          <button class="btn btn_success">Learn Now</button>
          <button
            class="btn btn_primary"
            @click.prevent="openModal('CreateCardModal')"
          >
            Create a card
          </button>
          <button
            class="btn btn_warning"
            @click.prevent="openModal('DeckFormModal')"
          >
            Edit deck
          </button>
        </div>
        <hr class="divide" />
        <div class="r">
          <card-list
            v-for="card in cards"
            :key="card._id"
            :picture="card.picture"
            :keyword="card.keyword"
          />
        </div>
      </div>
    </div>
    <!-- Modal -->
    <v-modal name="CreateCardModal">
      <div class="modal-body">
        <h2>Create a new Card</h2>
        <form action="">
          <div class="form_group">
            <label for="name">Name:</label>
            <input
              class="form_control"
              type="text"
              placeholder="Please enter name"
            />
          </div>
          <div class="form_group">
            <label for="description">Description:</label>
            <textarea
              class="form_control"
              name="description"
              placeholder="Please enter description"
            ></textarea>
          </div>
          <div class="form_group">
            <label for="thumbnail">Thumbnail:</label>
            <input type="file" name="thumbnail" />
            <div class="preview"></div>
          </div>
          <div class="form_group d_flex justify_content_end">
            <button class="btn btn_success" @click.prevent="createCard">
              Create
            </button>
            <button class="btn btn_danger ml_3" @click.prevent="closeModal">
              Close
            </button>
          </div>
        </form>
      </div>
    </v-modal>
  </section>
</template>

<script>
// import axios from 'axios'

import CardList from '@/components/Cards/CardList'
export default {
  components: {
    CardList,
  },
  middleware: ['check-auth', 'auth'],
  // validate({ params }) {
  //   return /^[0-9]$/.test(params.id)
  // },
  asyncData(context) {
    // return axios.get(`${process.env.baseApiUrl}/decks/${context.params.id}.json`)
    return (
      context.app.$axios
        .$get(`${process.env.baseApiUrl}/decks/${context.params.id}.json`)
        // reject(new Error('test'))
        // .then((response) => {
        .then((data) => {
          return {
            // deck: response.data
            deck: data,
          }
        })
        .catch((e) => {
          // console.log(e)
          context.error(e)
        })
    )
  },
  data() {
    return {
      cards: [
        {
          _id: 1,
          picture: 'https://picsum.photos/150',
          keyword: 'English',
        },
        {
          _id: 2,
          picture: 'https://picsum.photos/150',
          keyword: 'English',
        },
        {
          _id: 3,
          picture: 'https://picsum.photos/150',
          keyword: 'English',
        },
        {
          _id: 4,
          picture: 'https://picsum.photos/150',
          keyword: 'English',
        },
        {
          _id: 5,
          picture: 'https://picsum.photos/150',
          keyword: 'English',
        },
      ],
    }
  },
  head() {
    return {
      title: `Deck: ${this.deck.title} | Flash Card Online`,
    }
  },
  methods: {
    openModal(typeModal) {
      if (typeModal === 'CreateCardModal') {
        this.$modal.open({ name: 'CreateCardModal' })
      } else if (typeModal === 'DeckFormModal') {
        this.$modal.open({
          name: 'DeckFormModal',
          payload: { ...this.deck, id: this.$route.params.id },
        })
      }
    },
    closeModal() {
      this.$modal.close({ name: 'CreateCardModal' })
    },
  },
}
</script>

<style lang="scss">
section {
  padding-top: 3rem;
  .card {
    padding: 1rem;
  }
  .divide {
    margin: 2rem 0;
  }
}
</style>
