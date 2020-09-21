<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-icon
                v-bind="attrs"
                v-on="on"
                small
                class="mr-2"
            >
            mdi-pencil
            </v-icon>
        </template>

        <v-card>
            <v-card-title>
                <span class="headline">Modifier produit</span>
            </v-card-title>
            <v-card-text>
                <v-container>
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
                                name="Description"
                                label="Description"
                                auto-grow
                                background-color="transparent"
                                v-model="produit.description"
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

                        <!-- Images -->
                        <v-row>
                            <!-- Image db -->
                            <v-col cols="6" v-if="(typeof produit.image) == 'string'" class="align-center">
                                <v-card height="300px" class="pa-2">
                                    <v-img
                                        :src="'http://192.168.0.18:3000/'+ produit.image"
                                        contain
                                        height="250px" />
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn icon @click="resetProductImage">
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                            <!-- Image upload -->
                            <v-col cols="6" v-else>
                                <v-card style="padding: 120px 30px 125px 25px;">
                                            <v-file-input
                                                accept="image/png, image/jpeg"
                                                placeholder="Choisir une photo"
                                                prepend-icon="mdi-camera"
                                                dense
                                                @change="onFileSelected"
                                            ></v-file-input>
                                </v-card>
                            </v-col>
                        </v-row>

                </v-container>
                <small>*indique les champs requis</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Fermer</v-btn>
                <v-btn color="blue darken-1" text @click="[dialog = false, editExistingProduct(produit._id)]">Sauvegarder</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: ['produit'],
    data () {
        return {
            dialog: false,
            // produit: {
            //     categorie: null,
            //     description: null,
            //     disponibilite: false,
            //     image: null,
            //     marque: null,
            //     nom: null,
            //     prix: null,
            //     type: null
            // },
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
          'editProduct'
      ]),
      editExistingProduct (productId) {
          const productData = {
            _id: productId,
            categorie: this.produit.categorie,
            description: this.produit.description,
            disponibilite: this.produit.disponibilite,
            image: this.produit.image,
            marque: this.produit.marque,
            nom: this.produit.nom,
            prix: this.produit.prix,
            type: this.produit.type
          }

          this.editProduct(productData)
      },
      onFileSelected (file) {
          this.produit.image = file
      },
      resetProductImage () {
          this.produit.image = null
      }
    }
}
</script>
