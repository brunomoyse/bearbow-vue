import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import openSocket from 'socket.io-client'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuetify from 'vuetify/lib'
import axios from 'axios'
import { Ripple } from 'vuetify/lib/directives'

// Ajouter l'url de base pour les requêtes 'axios'
// axios.defaults.baseURL = 'http://18.193.101.111:3030/'
axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.headers.get.accept = 'application/json'
// eslint-disable-next-line quote-props
axios.defaults.headers.common = { 'Authorization': `Bearer ${store.state.token}` }

Vue.config.productionTip = false

Vue.use(Vuetify, {
    directives: {
      Ripple
    }
  })

export default new Vuetify({
  icons: {
    iconfont: 'md'
  }
})

new Vue({
  router,
  store,
  openSocket,
  vuetify,
  axios,
  render: h => h(App)
}).$mount('#app')
