<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="grey lighten-3"
                v-bind="attrs"
                v-on="on"
            >
                <v-icon
                    left
                >mdi-plus-thick</v-icon>
                Nouveau produit
            </v-btn>
        </template>

        <v-card>
            <v-card-title>
                <span class="headline">Nouveau produit</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>

                        <!-- Nom -->
                        <v-col cols="12">
                            <v-text-field
                                label="Nom"
                                required
                                v-model="produit.nom"
                            ></v-text-field>
                        </v-col>

                        <!-- Type -->
                        <v-col cols="12">
                            <v-select
                                :items="this.form.type"
                                label="Type"
                                required
                                v-model="produit.type"
                            ></v-select>
                        </v-col>

                        <!-- Catégories -->
                            <!-- Catégorie d'Arcs -->
                            <v-col cols="12" v-if="this.produit.type == 'Arcs'">
                                <v-select
                                    :items="this.form.categorie.arc"
                                    label="Catégorie"
                                    v-model="produit.categorie"
                                ></v-select>
                            </v-col>

                            <!-- Catégorie d'Accessoires -->
                            <v-col cols="12" v-else-if="this.produit.type == 'Accessoires'">
                                <v-select
                                    :items="this.form.categorie.accessoire"
                                    label="Catégorie"
                                    v-model="produit.categorie"
                                ></v-select>
                            </v-col>

                        <!-- Marque -->
                            <!-- Marque Arcs -->
                            <v-col cols="12" v-if="this.produit.type == 'Arcs'">
                                <v-select
                                    :items="this.form.marque.arc"
                                    label="Marque"
                                    v-model="produit.marque"
                                ></v-select>
                            </v-col>

                            <!-- Marque Accessoires -->
                            <v-col cols="12" v-if="this.produit.type == 'Accessoires'">
                                <v-select
                                    :items="this.form.marque.accessoire"
                                    label="Marque"
                                    v-model="produit.marque"
                                ></v-select>
                            </v-col>

                        <!-- Description -->
                        <v-col cols="12">
                            <v-textarea
                                name="input-7-1"
                                label="Description"
                                auto-grow
                                background-color="transparent"
                                v-model="produit.description"
                                value="Description du produit"
                            ></v-textarea>
                        </v-col>

                        <!-- Prix -->
                        <v-col cols="12">
                            <v-text-field
                                label="Prix"
                                type="number"
                                min="0"
                                hide-details
                                required
                                v-model="produit.prix"
                            ></v-text-field>
                        </v-col>

                        <!-- Disponibilité -->
                        <v-col cols="12">
                            <v-checkbox
                                v-model="produit.disponibilite"
                                label="Disponible"
                                color="grey"
                            ></v-checkbox>
                        </v-col>

                        <!-- Image upload -->
                        <v-col cols="12">
                            <v-file-input
                                :rules="rules"
                                accept="image/png, image/jpeg"
                                placeholder="Choisir une photo"
                                prepend-icon="mdi-camera"
                                dense
                                v-model="produit.image"
                                @change="onFileSelected"
                            ></v-file-input>
                        </v-col>

                    </v-row>
                </v-container>
                <small>*indique les champs requis</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Fermer</v-btn>
                <v-btn color="blue darken-1" text @click="[dialog = false, addNewProduct()]">Sauvegarder</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data () {
        return {
            rules: [],
            dialog: false,
            produit: {
                categorie: null,
                description: null,
                disponibilite: false,
                image: null,
                marque: null,
                nom: null,
                prix: null,
                type: null
            },
            // snackbar
            color: 'green',
            mode: '',
            snackbar: false,
            text: 'Produit ajouté',
            timeout: 3500,
            x: 'left',
            y: 'bottom',
            //
            form: {
                type: ['Arcs', 'Accessoires'],
                categorie: {
                    arc: ['Recurve', 'Compound', 'Barebow'],
                    accessoire: ['Viseur', 'Stabilisateur']
                },
                marque: {
                    arc: ['Bowtech', 'Mathews', 'Elite', 'PSE', 'MK Archery', 'Buck Trail Elite'],
                    accessoire: ['Shibuya', 'Axcel']
                }
            }
        }
    },
    methods: {
      ...mapActions([
          'addProduct',
          'setAlert'
      ]),
      addNewProduct () {
          const productData = {
            categorie: this.produit.categorie,
            description: this.produit.description,
            disponibilite: this.produit.disponibilite,
            image: this.produit.image,
            marque: this.produit.marque,
            nom: this.produit.nom,
            prix: this.produit.prix,
            type: this.produit.type
          }
          this.addProduct(productData)
            .then(() => {
                this.setAlert({
                    display: true,
                    message: 'Produit ajouté.'
                })
                const sound = new Audio('notification.wav')
                const playPromise = (
                    sound.volume = 0.1,
                    sound.play()
                )

                if (playPromise !== undefined) {
                    playPromise.then()
                    .catch(err => {
                        console.log(err)
                    })
                }

                this.resetProductForm()
            })
            .catch(err => {
                console.log(err)
            })
      },
      resetProductForm () {
          this.produit = []
      },
      onFileSelected (file) {
          this.produit.image = file
      }
    }
}
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
