<template>
    <v-icon
        medium
        color="red lighten-3"
        @click="deleteProduct(productId)">
    >
        mdi-delete
    </v-icon>
</template>

<script>

import { mapActions } from 'vuex'

export default {
    name: 'SupprimerProduit',
    props: {
        productId: String
    },
    data: () => ({

    }),
    methods: {
        ...mapActions([
          'delProduct'
        ]),

        deleteProduct (id) {
            const response = confirm('Voulez-voulez vraiment supprimer ce produit?')
            if (response) {
                this.delProduct(id)
                    .then(() => {
                        // this.snackbar = true
                        // setTimeout(() => {
                        //     this.snackbar = false
                        // }, 5000)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    }
}
</script>
