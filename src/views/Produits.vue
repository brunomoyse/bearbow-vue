<template>
<div id="app" class="mt-50">
  <v-app id="inspire" class="mt-5">
    <!-- Tableur-->
    <v-data-table
        class="elevation-1 pa-3"
        :headers="headers"
        hide-default-footer
        :items="produits"
        :items-per-page="-1"
        multi-sort
        :search="search"
    >
        <!-- Barre en haut du tableur-->
        <template v-slot:top>
            <v-toolbar flat color="white">

                <!-- Titre -->
                <v-toolbar-title>Arcs</v-toolbar-title>

                <!-- Séparateur-->
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>

                <!-- Barre de recherche-->
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Rechercher"
                    class="shrink"
                    single-line
                    hide-details
                ></v-text-field>

                <!-- Espace -->
                <v-spacer></v-spacer>

                <!-- Ajouter un produit -->
                <AjouterProduit />
            </v-toolbar>
        </template>

        <!-- Formater le prix à deux décimales -->
        <template v-slot:[`item.prix`]="{ item }">
            <div v-if="typeof item.prix === 'number'">
                {{ new Intl.NumberFormat('fr-BE', { style: 'currency', currency: 'EUR' }).format(Number(item.prix)) }}
            </div>
        </template>

        <!-- Dispo -->
        <template v-slot:[`item.disponibilite`]="{ item }">
           <div v-if="item.disponibilite === true">
               V
           </div>
           <div v-else-if="item.disponibilite === false">
               X
           </div>
        </template>

        <!-- Actions éditer/supprimer-->
        <template v-slot:[`item.actions`]="{ item }">
            <!-- Editer le produit -->
            <EditerProduit :produit="item" />

            <!-- Supprimer le produit -->
            <v-icon
                small
                @click="deleteProduct(item._id)">
            >
                mdi-delete
            </v-icon>
        </template>

        <!-- Si la recherche ne donne rien -->
        <template v-slot:no-results>
            <span>Aucun produit correspondant à la recherche.</span>
        </template>

        <!-- Si problème connexion db -->
        <template v-slot:no-data>
            <span>Problème de chargement des produits.</span>
        </template>

    </v-data-table>
  </v-app>

    <Alerte />

</div>
</template>

<script>

import Alerte from '@/components/Alertes/Alerte.vue'
import AjouterProduit from '@/components/Produits/Ajouter.vue'
import EditerProduit from '@/components/Produits/Editer.vue'

import { mapGetters, mapActions } from 'vuex'

export default {

    components: {
        Alerte,
        AjouterProduit,
        EditerProduit
    },

    data: () => ({
        dialog: false,
        headers: [
            { text: 'Nom', align: 'start', value: 'nom' },
            { text: 'Categorie', value: 'categorie' },
            { text: 'Marque', value: 'marque' },
            { text: 'Prix (€)', align: 'end', value: 'prix' },
            { text: 'Disponibilité', align: 'center', value: 'disponibilite' },
            { text: 'Actions', value: 'actions', sortable: false }
        ],
        search: '',
        slots: [
            'no-data',
            'no-results'
        ]
    }),

    computed: {

        ...mapGetters([
            'getProducts'
        ]),

        produits () {
            return this.getProducts
        }

    },

    methods: {

        ...mapActions([
            'setProducts',
            'delProduct',
            'setAlert'
        ]),

        deleteProduct (id) {
            const response = confirm('Voulez-voulez vraiment supprimer ce produit?')
            if (response) {
                this.delProduct(id)
                    .then(() => {
                        this.setAlert({
                            display: true,
                            message: 'Produit supprimé.'
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }

    },

    created () {
        this.setProducts()
    }

}
</script>
