<template>
    <v-card class="header pl-4 mb-1" height="3rem">
        <v-row class="pl-2 pr-2">
            <!-- Catégorie -->
            <v-col col="4">
                <v-btn
                    small
                    text
                    @click="sort('marque')"
                    class="pl-0"
                >
                    <span>Catégorie</span>
                </v-btn>
            </v-col>
            <!-- Marque -->
            <v-col col="4">
                <v-btn
                    small
                    text
                    @click="sort('marque')"
                    class="pl-0"
                >
                    <span>Marque</span>
                </v-btn>
            </v-col>
            <!-- Nom -->
            <v-col col="4">
                <v-btn
                    small
                    text
                    @click="sort('nom')"
                    class="pl-0"
                >
                    <span>Nom</span>
                </v-btn>
            </v-col>

            <!-- Prix -->
            <v-col col="2">
                <v-btn
                    small
                    text
                    @click="sort('marque')"
                    class="pl-0"
                >
                    <span>Prix (€)</span>
                </v-btn>
            </v-col>
            <!-- Actions -->
            <v-col col="2">
                <v-btn
                    small
                    text
                    disabled
                >
                    <span><!-- Actions --></span>
                </v-btn>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>

export default {
    data () {
        return {
            sortBy: 'name',
            sortDirection: 'ascending'
        }
    },
    computed: {
        products () {
            // .products = object
            // .products.products = array
            return this.$store.state.products.products
        }
    },
    methods: {
        sort (prop) {
            if (prop === this.sortBy) {
                // reverse sort order if requested sort is the same as current
                this.sortDirection = this.sortDirection === 'ascending' ? 'descending' : 'ascending'
            } else {
                // otherwise sort order is ascending
                this.sortDirection = 'ascending'
            }
            this.sortBy = prop
            this.products.sort((a, b) => {
                if (typeof a[prop] === 'number' && typeof b[prop] === 'number') {
                    // Si nombre
                    if (a[prop] < b[prop]) {
                        return this.sortDirection === 'ascending' ? -1 : 1
                    } else if (a[prop] > b[prop]) {
                        return this.sortDirection === 'ascending' ? 1 : -1
                    }
                } else { // Si string
                    // le sort() de JS prend en compte la casse
                    if (a[prop].toLowerCase() < b[prop].toLowerCase()) {
                        return this.sortDirection === 'ascending' ? -1 : 1
                    } else if (a[prop].toLowerCase() > b[prop].toLowerCase()) {
                        return this.sortDirection === 'ascending' ? 1 : -1
                    }
                }
            })
        }
    }
}
</script>
