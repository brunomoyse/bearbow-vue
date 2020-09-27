<template>
<div id="app" class="mt-50">
  <v-app id="inspire" class="mt-5">
    <!-- Tableur-->
    <v-data-table
        class="elevation-1 pa-3"
        :headers="headers"
        hide-default-footer
        :items="orders"
        :items-per-page="-1"
        multi-sort
        :search="search"
    >
        <!-- Barre en haut du tableur-->
        <template v-slot:top>
            <v-toolbar flat color="white">

                <!-- Titre -->
                <v-toolbar-title>Commandes</v-toolbar-title>

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

            </v-toolbar>
        </template>

        <!-- Formater la date -->
        <template v-slot:[`item.date`]="{ item }">
            {{ formatDate(item.date) }}
        </template>

        <!-- Formater le prix à deux décimales -->
        <template v-slot:[`item.total`]="{ item }">
            <div v-if="typeof item.total === 'number'">
                {{ new Intl.NumberFormat('fr-BE', { style: 'currency', currency: 'EUR' }).format(Number(item.total)) }}
            </div>
        </template>

        <!-- Si la recherche ne donne rien -->
        <template v-slot:no-results>
            <span>Aucune commande correspondante à la recherche.</span>
        </template>

        <!-- Si problème connexion db -->
        <template v-slot:no-data>
            <span>Problème de chargement des commandes.</span>
        </template>

    </v-data-table>
  </v-app>

    <Alerte />

</div>
</template>

<script>

import Alerte from '@/components/Alertes/Alerte.vue'

import { mapGetters, mapActions } from 'vuex'

export default {

    components: {
        Alerte
    },

    data: () => ({
        dialog: false,
        headers: [
            { text: 'Date', align: 'start', value: 'date' },
            { text: 'N°', align: 'start', value: 'number', sortable: false },
            { text: 'Total (€)', align: 'end', value: 'total', sortable: false }
        ],
        search: '',
        slots: [
            'no-data',
            'no-results'
        ]
    }),

    computed: {

        ...mapGetters([
            'getOrders'
        ]),

        orders () {
            return this.getOrders
        }

    },

    methods: {

        ...mapActions([
            'setOrders'
        ]),

        formatDate (e) {
            const newDate = new Date(e)
            const year = newDate.getFullYear()
            const month = newDate.getMonth()
            const day = newDate.getDay()
            const hours = newDate.getHours()
            const minutes = newDate.getMinutes()
            const formatedDate = day + '/' + month + '/' + year + ' - ' + hours + ':' + minutes

            return formatedDate
        }

    },

    created () {
        this.setOrders()
    }

}
</script>
