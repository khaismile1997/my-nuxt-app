// import axios from 'axios'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

const createStore = () => {
  // eslint-disable-next-line import/no-named-as-default-member
  return new Vuex.Store({
    state: {
      decks: [],
      token: null,
      message: '',
    },
    mutations: {
      setDecks(state, payload) {
        state.decks = payload
      },
      addDeck(state, newDeck) {
        state.decks.push(newDeck)
      },
      editDeck(state, editDeck) {
        const deckIndex = state.decks.findIndex(
          (deck) => deck.id === editDeck.id
        )

        // state.decks[deckIndex] = editDeck // => return axios if use this way
        state.decks.splice(deckIndex, 1, editDeck)
      },
      setToken(state, token) {
        state.token = token
      },
      clearToken(state) {
        state.token = null
      },
    },
    actions: {
      // Way 3
      nuxtServerInit(vuexContext, context) {
        // return axios.get(process.env.baseApiUrl + '/decks.json')
        return (
          context.app.$axios
            .$get(process.env.baseApiUrl + '/decks.json')
            // reject(new Error('test'))
            // .then((response) => {
            .then((data) => {
              const decksArr = []
              // for (const key in response.data) {
              //   decksArr.push({ ...response.data[key], id: key })
              // }
              for (const key in data) {
                decksArr.push({ ...data[key], id: key })
              }

              vuexContext.commit('setDecks', decksArr)
            })
            .catch((e) => {
              // console.log(e)
              context.error(e)
            })
        )
      },
      addDeck(vuexContext, deckData) {
        // axios.post(process.env.baseApiUrl + '/decks.json', deckData)
        this.$axios
          .$post(
            process.env.baseApiUrl +
              '/decks.json?auth=' +
              vuexContext.state.token,
            deckData
          )
          // .then((result) => {
          .then((data) => {
            // console.log(result)
            vuexContext.commit('addDeck', { ...deckData, id: data.name })
          })
          .catch((e) => {
            // console.log(e)
          })
      },
      editDeck(vuexContext, deckData) {
        const deckId = deckData.id
        delete deckData.id

        // axios.put(`${process.env.baseApiUrl}/decks/${deckId}.json`, deckData)
        this.$axios
          .$put(
            `${process.env.baseApiUrl}/decks/${deckId}.json?auth=` +
              vuexContext.state.token,
            deckData
          )
          // .then((result) => {
          .then((data) => {
            vuexContext.commit('editDeck', { ...data, id: deckId })
          })
          .catch((e) => {
            // console.log(e)
          })
      },
      setDecks(vuexContext, payload) {
        vuexContext.commit('setDecks', payload)
      },
      authenticateUser(vuexContext, credentials) {
        return new Promise((resolve, reject) => {
          let authUrlApi = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbApiKey}`

          if (!credentials.isLogin) {
            authUrlApi = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbApiKey}`
          }

          this.$axios
            .$post(authUrlApi, {
              email: credentials.email,
              password: credentials.password,
              returnSecureToken: true,
            })
            .then((result) => {
              vuexContext.commit('setToken', result.idToken)
              localStorage.setItem('token', result.idToken)
              localStorage.setItem(
                'tokenExpiration',
                new Date().getTime() + result.expiresIn * 1000
              )

              Cookies.set('token', result.idToken)
              Cookies.set(
                'tokenExpiration',
                new Date().getTime() + result.expiresIn * 1000
              )
              vuexContext.dispatch('setTokenTimer', result.expiresIn * 1000)
              resolve({ success: true })
            })
            .catch((error) => {
              reject(error.response.data.error)
            })
        })
      },
      setTokenTimer(vuexContext, duration) {
        setTimeout(() => {
          vuexContext.commit('clearToken')
        }, duration)
      },
      initAuth(vuexContext, req) {
        let token, tokenExpiration
        if (req) {
          // Handle 1st time go to page
          const cookie = req.headers.cookie
          if (!cookie) return false
          const tokenKey = cookie
            .split(';')
            .find((c) => c.trim().startsWith('token'))
          const tokenExpirationKey = cookie
            .split(';')
            .find((c) => c.trim().startsWith('tokenExpiration'))

          if (!tokenKey || !tokenExpirationKey) {
            vuexContext.dispatch('logout')
            return false
          }
          token = tokenKey.split('=')[1]
          tokenExpiration = tokenExpirationKey.split('=')[1]
        } else {
          token = localStorage.getItem('token')
          tokenExpiration = localStorage.getItem('tokenExpiration')

          if (new Date().getTime() > tokenExpiration || !token) {
            vuexContext.dispatch('logout')
            return false
          }
        }

        vuexContext.dispatch(
          'setTokenTimer',
          tokenExpiration - new Date().getTime()
        )
        vuexContext.commit('setToken', token)
      },
      logout(vuexContext) {
        vuexContext.commit('clearToken')

        localStorage.removeItem('token')
        localStorage.removeItem('tokenExpiration')

        Cookies.remove('token')
        Cookies.remove('tokenExpiration')
      },
    },
    getters: {
      decks(state) {
        // Can do something to reverse decks
        return state.decks
      },
      isAuthenticated(state) {
        return state.token != null
      },
    },
  })
}

export default createStore
