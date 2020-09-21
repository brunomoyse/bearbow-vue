import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi'

  },
  theme: {
    themes: {
      light: {
        success: '#81C784',
        primary: '#CFD8DC'
      }
    }
  }
})
