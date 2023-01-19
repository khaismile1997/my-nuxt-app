<template>
  <div>
    <div class="ct">
      <div class="d_flex justify_content_between my_3">
        <h3>List of your decks:</h3>
        <button
          class="btn btn_success"
          @click.prevent="openModal('DeckFormModal')"
        >
          Create a Deck
        </button>
      </div>
      <ul class="decks-list">
        <deck-list
          v-for="deck in decks"
          :id="deck.id"
          :key="deck.id"
          :title="deck.title"
          :thumbnail="deck.thumbnail"
          :description="deck.description"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import DeckList from '@/components/Decks/DeckList'
export default {
  components: {
    DeckList,
  },
  middleware: ['check-auth', 'auth'],
  // asyncData(context) {
  //   // Way 1
  //   // Dữ liệu trong asyncData xử lý có trình tự => phải trả về Promise
  //   // context là phần đã thực thi khi kết nối api (VD: context.axios...)
  //   // sau khi xong sẽ gọi callback
  //   // callback có 2 params, 1 là có lỗi ko, 2 là data muốn set
  //   // => những biến cố định ko change => dùng data (VD: biến về trạng thái, xác định trạng thái loading của UI element nào đó)
  //   // => những dữ liệu sau này khi đổ vào DOM sử dụng để SEO
  //   // Nuxt hoạt động khi lần đầu tiên trang web đc refresh. lúc này nuxt sử dụng server để render ra các DOM để search engin có thể đọc được
  //   // => khi refresh lần đầu => console log sẽ hiển thị ở server do asyncData đang hoạt động với Nuxt ở trên server
  //   // Lần thứ 2 trở đi, sau khi xử lý xong ở server thì mọi thứ sẽ trở về single page application
  //   // => tất cả mọi thứ đều do thằng Vue xử lý => console log sẽ hiển thị ở client
  //   // asyncData rất hữu ích. có thể truy cập axios, router, middleware, validate nên lần 1 có thể get data lần 2 có thể check role, check route, check validate
  //   // eslint-disable-next-line no-console
  //   // console.log('asyncData was excuted!')
  //   return new Promise((resolve, reject) => {
  //     // eslint-disable-next-line nuxt/no-timing-in-fetch-data
  //     setTimeout(() => {
  //       resolve({
  //         decks: [
  //           {
  //             _id: 1,
  //             title: 'English',
  //             picture: 'https://picsum.photos/250',
  //             description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. '
  //           },
  //           {
  //             _id: 2,
  //             title: 'Vietnamese',
  //             picture: 'https://picsum.photos/250',
  //             description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. '
  //           },
  //           {
  //             _id: 3,
  //             title: 'Japanese',
  //             picture: 'https://picsum.photos/250',
  //             description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. '
  //           }
  //         ]
  //       })
  //     }, 1000)
  //     // reject(new Error('test'))
  //   }).then((data) => {
  //     return data
  //   }).catch((e) => {
  //     // console.log(e)
  //     context.error(e)
  //   })
  // },
  data() {
    return {
      // decks: []
    }
  },
  head: {
    title: 'Decks | Flash Card Online',
  },
  // fetch(context) {
  //   // Way 2
  //   // hàm fetch tương tự như asyncData nhưng không set giá trị cho data() khi trả về
  //   // nên sau khi xử lý xong phải set luôn vào store
  //   return new Promise((resolve, reject) => {
  //     // eslint-disable-next-line nuxt/no-timing-in-fetch-data
  //     setTimeout(() => {
  //       resolve({
  //         decks: [
  //           {
  //             _id: 1,
  //             title: 'English',
  //             picture: 'https://picsum.photos/250',
  //             description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. '
  //           },
  //           {
  //             _id: 2,
  //             title: 'Vietnamese',
  //             picture: 'https://picsum.photos/250',
  //             description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. '
  //           },
  //           {
  //             _id: 3,
  //             title: 'Japanese',
  //             picture: 'https://picsum.photos/250',
  //             description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. '
  //           }
  //         ]
  //       })
  //     }, 1000)
  //     // reject(new Error('test'))
  //   }).then((data) => {
  //     context.store.dispatch('setDecks', data.decks)
  //   }).catch((e) => {
  //     // console.log(e)
  //     context.error(e)
  //   })
  // },
  computed: {
    decks() {
      return this.$store.getters.decks
    },
  },
  // created() {
  //   // dùng created xử lý gán data, vì created do vue chịu trách nhiệm, mà vue không làm việc đối với server side rendering
  //   // nên không thể render đến DOM giống như nuxt được
  //   // nên nuxt phát sinh hàm asyncData để giải quyết vấn đề này, những data mà được sinh ra sau vẫn đc đổ vào DOM => tốt cho SEO
  //   this.$store.dispatch('setDecks', this.decks)
  //   // console.log(this.$store.getters.decks)
  // },
  methods: {
    // showDeck() {
    //   this.$router.push(`/decks/${this.deckID}`)
    // }
    openModal() {
      this.$modal.open({ name: 'DeckFormModal' })
    },
  },
}
</script>

<style lang="scss">
.decks-list {
  list-style: none;
  margin: 0;
  padding: 0;
  deck {
    display: block;
  }
  li {
    margin-bottom: 1rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .decks-card {
    display: flex;
    flex-direction: row;
    height: 250px;
  }
}
</style>
