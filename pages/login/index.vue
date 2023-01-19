<template>
  <section class="page">
    <div class="card card-form">
      <div class="card_body">
        <h3 class="text_center">Login</h3>
        <event-alert
          v-if="isShow"
          class="mt_3"
          :klass="klass"
          :message="message"
        />
        <form @submit.prevent="onSubmit">
          <div class="form_group">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="email"
              class="form_control"
              type="text"
            />
          </div>
          <div class="form_group">
            <label for="password">Password</label>
            <input
              id="password"
              v-model="password"
              class="form_control"
              type="password"
            />
          </div>
          <button type="submit" class="btn btn_success btn-submit">
            Login
          </button>
          <div class="mt_2 text_center">
            <span
              >Haven't your account?
              <nuxt-link to="/register" tag="a">Register here</nuxt-link></span
            >
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'auth',
  data() {
    return {
      email: '',
      password: '',
      isShow: false,
      message: '',
      klass: '',
    }
  },
  methods: {
    onSubmit() {
      // call api to firebase
      this.$store
        .dispatch('authenticateUser', {
          email: this.email,
          password: this.password,
          isLogin: true,
        })
        .then((result) => {
          if (result.success) {
            this.isShow = true
            this.klass = 'alert_success'
            this.message = 'Logged in successfully!'
            setTimeout(() => this.$router.push('/decks'), 1000)
          }
        })
        .catch((error) => {
          this.isShow = true
          this.klass = 'alert_danger'
          this.message = error.message
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.page {
  padding-top: 100px;
  display: flex;
  justify-content: center;
  .card-form {
    width: 500px;
  }
  .btn-submit {
    width: 100%;
  }
}
</style>
