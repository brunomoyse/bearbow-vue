<template>

    <section class="d-flex align-center flex-column mt-5">

                <v-card min-width="350px" max-width="60%" class="pa-5">
                    <v-card-title>
                        <span class="headline">Se connecter</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                        <v-row>
                            <v-col cols="12">
                            <v-text-field
                                label="Email"
                                required
                                type="email"
                                v-model="user.email"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                            <v-text-field
                                label="Mot de passe"
                                required
                                type="password"
                                v-model="user.password"
                                @keydown.enter="login()"></v-text-field>
                            </v-col>

                        </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green lighten-4" @click="login()">Se connecter</v-btn>
                    </v-card-actions>
                </v-card>

    </section>

</template>

<script>

import { mapActions } from 'vuex'

export default {
    data () {
        return {
            user: {
                email: null,
                password: null
            }
        }
    },
    methods: {
      ...mapActions([
          'setToken'
      ]),
      login () {
        const userData = {
            email: this.user.email,
            password: this.user.password
        }
        this.setToken(userData)
            // .then(() => {
            //     this.resetProductForm()
            // })
            .then(res => {
               this.$router.push({ name: 'Home' })
            })
            // .then(() => {
            //     this.$router.push({ name: 'Home' })
            // })
            .catch(err => {
                console.log('erreur dans connect.vue : ' + err)
                console.log('erreur status dans connect.vue : ' + JSON.stringify(err))
                if (err.status === 401) {
                    console.log('Problème de connection 401')
                }
                if (err.status !== 200) {
                     console.log('Problème de connection survenu')
                }
            })
      },
      resetProductForm () {
          this.user = []
      }
    }
}
</script>
