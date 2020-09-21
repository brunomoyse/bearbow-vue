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
// axios.defaults.baseURL = 'http://ec2-3-125-122-130.eu-central-1.compute.amazonaws.com:3000'
axios.defaults.baseURL = 'http://192.168.0.18:3000/'
// axios.defaults.headers.get['Accept'] = 'application/json';
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
