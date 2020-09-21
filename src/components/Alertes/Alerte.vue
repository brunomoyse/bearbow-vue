<template>

    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :color="color"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          dark
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>

</template>

<script>

import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            color: 'green',
            mode: '',
            // snackbar: false,
            // text: 'Produit ajouté',
            // timeout: 3500,
            x: 'center',
            y: 'bottom',
            notification: false
        }
    },
    computed: {

        ...mapGetters([
            'getAlert'
        ]),

        snackbar () {
            return this.getAlert.display
        },
        text () {
            return this.getAlert.message
        }

    }
}
</script>
