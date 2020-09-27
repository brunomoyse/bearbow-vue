import axios from 'axios'
import openSocket from 'socket.io-client'

const actions = {

    /* --- Alertes --- */

    setAlert ({ commit }, alert) {
        try {
            commit('SET_ALERT', alert)
            setTimeout(() => {
                commit('SET_ALERT', { display: false, message: null })
              }, 3000)
        } catch (error) {
            console.error(error)
        }
    },

    /* --- Auth --- */
    delToken ({ commit }, data) {
        if (data !== null) {
            localStorage.removeItem('access_token')
            commit('SET_TOKEN', null)
        }
    },
    setToken ({ commit }, data) {
        return axios.post('users/login', data)
            .then(response => {
                if (response.status !== 200) {
                    alert('Impossible de s\'authentifier')
                } else {
                    console.log(response.data.message)
                    const token = response.data.token
                    localStorage.setItem('access_token', token)
                    commit('SET_TOKEN', token)
                }
            })
            .catch(err => {
                throw (err)
            })
    },

    /* --- Products --- */
    setProducts ({ commit }) {
      return axios.get('products')
            .then(response => {
                commit('SET_PRODUCTS', response.data)
                const socket = openSocket('localhost:3030/')
                socket.on('products', data => {
                    switch (data.action) {
                        case 'create':
                            commit('ADD_PRODUCT', data.product)
                            break
                        case 'update':
                            commit('EDIT_PRODUCT', data.product)
                            break
                        case 'delete':
                            commit('DEL_PRODUCT', data.id)
                    }
                })
            })
    },

    addProduct ({ commit }, data) {
        var fdAddProduct = new FormData()

        fdAddProduct.append('nom', data.nom)
        fdAddProduct.append('type', data.type)
        fdAddProduct.append('categorie', data.categorie)
        fdAddProduct.append('marque', data.marque)
        if (data.description) {
            fdAddProduct.append('description', data.description)
        }
        if (data.prix) {
            fdAddProduct.append('prix', Number(data.prix).toFixed(2))
        }
        data.disponibilite ? fdAddProduct.append('disponibilite', true) : fdAddProduct.append('disponibilite', false)
        if (data.image) {
            data.image.forEach(file => {
                fdAddProduct.append('image', file, file.name)
            })
        }

        return axios.post('products', fdAddProduct)
            .catch((err) => console.log(err))
    },

    editProduct ({ commit }, data) {
        const id = data._id

        var fdUpdate = new FormData()

        if (data.image !== null) {
            const typeImage = typeof Object.entries(data.image)[0][1]

            if (typeImage === 'string') {
                fdUpdate.append('image', data.image)
            } else if (typeImage === 'object') {
                data.image.forEach(file => {
                    data.image.forEach(file => {
                        fdUpdate.append('image', file, file.name)
                    })
                })
            }
        }

        fdUpdate.append('_id', data._id)
        fdUpdate.append('nom', data.nom)
        fdUpdate.append('type', data.type)
        fdUpdate.append('categorie', data.categorie)
        fdUpdate.append('marque', data.marque)
        if (data.description) {
            fdUpdate.append('description', data.description)
        }
        if (data.prix) {
            fdUpdate.append('prix', Number(data.prix).toFixed(2))
        }
        data.disponibilite ? fdUpdate.append('disponibilite', true) : fdUpdate.append('disponibilite', false)

        return axios.patch(`products/${id}`, fdUpdate)
            .then(response => {
              if (response.status === 200) {
                console.log(response.data.message)
                // commit('EDIT_PRODUCT', data)
              }
            })
            .catch((err) => console.log('erreur action editProduct: ' + err))
    },

    delProduct ({ commit }, id) {
        return axios.delete(`products/${id}`)
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data.message)
                  }
                // commit('DEL_PRODUCT', id)
            })
            .catch((err) => {
                throw (err)
            })
    },

    /* --- Orders --- */
    setOrders ({ commit }) {
        return axios.get('orders')
            .then(response => {
                commit('SET_ORDERS', response.data)
                const socket = openSocket('localhost:3030/')
                socket.on('orders', data => {
                    switch (data.action) {
                        case 'create':
                            commit('ADD_ORDER', data.order)
                            break
                        case 'update':
                            commit('EDIT_ORDER', data.order)
                            break
                        case 'delete':
                            commit('DEL_ORDER', data.id)
                    }
                })
            })
    }

  }

  export default actions
