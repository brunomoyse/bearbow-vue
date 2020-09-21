<template>
    <section>
        <nav>
            <v-app-bar app id="BearBow">
                <v-app-bar-nav-icon class="grey--text" aria-label="Left Align" @click="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title class="text-uppercase grey--text" >
                    <span class="font-weight-light">Bear</span>
                    <span>Bow</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                    v-if="auth === false && this.$route.path != '/connect'"
                    color="light-grey"
                    :to="{ name: 'Connect' }"
                >
                    <span>Se connecter</span>
                    <v-icon right>mdi-exit-to-app</v-icon>
                </v-btn>
                <v-btn
                    v-if="auth === true"
                    color="light-grey"
                    @click="disconnect()"
                >
                    <span>Se déconnecter</span>
                    <v-icon right>mdi-exit-to-app</v-icon>
                </v-btn>
            </v-app-bar>

            <v-navigation-drawer app class="primary" v-model="drawer"  >
                <v-list>
                    <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                        <v-list-item-action>
                            <v-icon>{{ link.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>{{ link.text }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>

        </nav>
    </section>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            drawer: false,
            links: [
                { icon: 'mdi-home', text: 'Home', route: '/' },
                { icon: 'mdi-folder', text: 'Produits', route: '/produits' },
                { icon: 'mdi-shopping-outline', text: 'Commandes', route: '/orders' }
            ]
        }
    },
    computed: {
    // import getters from the store
      ...mapGetters([
          'getProducts',
          'getToken'
      ]),
      products () {
          // .products car dans mon object-résult de l'API, j'ai .count et .products
          return this.getProducts.products
      },
      auth () {
          if (this.getToken === null) {
              return false
          } else {
              return true
          }
      }
    },
    methods: {
        ...mapActions([
            'delToken'
        ]),
        disconnect () {
            this.delToken(this.getToken)
            this.$router.push({ name: 'Connect' })
        }
    }
}
</script>

<style scoped>
    @media only screen and (min-width: 500px) {
        #BearBow {
            background-image: url("../assets/bearbow-grey.svg");
            background-repeat: no-repeat;
            background-size: 88px 120px;
            background-position-x: 190px;
            background-position-y: 0%;
        }
    }
</style>
