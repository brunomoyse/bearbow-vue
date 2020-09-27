/* eslint-disable eqeqeq */
const getters = {

    /* --- TOKEN --- */
    getToken (state) {
        return state.token
    },

    /* --- PRODUCTS --- */
    getProducts (state) {
        return state.products.all
    },

    /* --- PRODUCTS --- */
    getOrders (state) {
        return state.orders.all
    },

    getAlert (state) {
        return state.alert
    }

    // getProductById (state) {
    //   return function (id) {
    //     return state.products.find(product => product.id == id)
    //   }
    // },
    // getProductsByCategory (state) {
    //   return function (category) {
    //     return state.products.filter(products => products.categorie == category)
    //   }
    // }

  }

  export default getters
