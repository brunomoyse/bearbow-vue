// ./resources/js/store/mutations.js
const mutations = {

    /* --- ALERT --- */
    SET_ALERT (state, data) {
        state.alert = data
    },

    /* --- TOKEN --- */
    SET_TOKEN (state, data) {
        state.token = data
    },

    /* --- PRODUCTS --- */
    SET_PRODUCTS (state, data) {
      state.products = data
    },
    ADD_PRODUCT (state, product) {
        state.products.all.push({
            _id: product._id,
            categorie: product.categorie,
            description: product.description,
            disponibilite: product.disponibilite,
            image: product.image,
            marque: product.marque,
            nom: product.nom,
            prix: product.prix,
            type: product.type
        })
    },
    EDIT_PRODUCT (state, product) {
        const products = state.products.all
        const id = product._id
        const index = products.findIndex(p => p._id === id)
        products.splice(index, 1, product)
    },
    DEL_PRODUCT (state, id) {
        const products = state.products.all
        const index = products.findIndex(product => product._id === id)
        products.splice(index, 1)
    }
  }
  export default mutations
