<template>
  <section class="page">
    <div class="card card-form">
      <div class="card_body">
        <h3 class="text_center">Register</h3>
        <event-alert
          v-if="isShow"
          class="mt_3"
          :klass="klass"
          :message="message"
        />
        <span v-if="isShow && klass == 'alert_success'" class="count-down"
          >( {{ countDown }} )</span
        >
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
          <div class="form_group">
            <label for="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              v-model="confirmPassword"
              class="form_control"
              type="password"
            />
          </div>
          <button type="submit" class="btn btn_success btn-submit">
            Register
          </button>
          <div class="mt_2 text_center">
            <span
              >Have your account?
              <nuxt-link to="/login" tag="a">Login here</nuxt-link></span
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
      confirmPassword: '',
      isShow: false,
      message: '',
      klass: '',
      countDown: 5,
    }
  },
  methods: {
    checkValidPassword() {
      return this.password ? this.password === this.confirmPassword : false
    },
    onSubmit() {
      const validPassword = this.checkValidPassword()

      if (validPassword) {
        this.$store
          .dispatch('authenticateUser', {
            email: this.email,
            password: this.password,
          })
          .then((result) => {
            if (result.success) {
              this.isShow = true
              this.klass = 'alert_success'
              this.message =
                "Congratulations, your account has been successfully created! You'll be redirected to the login page in:"
              this.countDownTimer()
              setTimeout(() => this.$router.push({ path: '/login' }), 5000)
            }
          })
          .catch((error) => {
            this.isShow = true
            this.klass = 'alert_danger'
            this.message = error.message
          })
      } else {
        this.isShow = true
        this.klass = 'alert_danger'
        this.message = 'Password and confirm password does not match!'
      }
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown--
          this.countDownTimer()
        }, 1000)
      }
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
  .count-down {
    color: red;
  }
}
</style>
