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
        return axios.post('user/login', data)
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
                const socket = openSocket('http://192.168.0.18:3030/')
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
        const fd = new FormData()

        fd.append('categorie', data.categorie)
        if (data.description) {
            fd.append('description', data.description)
        }
        fd.append('disponibilite', data.disponibilite)
        if (data.image) {
            fd.append('image', data.image, data.image.name)
        }
        fd.append('marque', data.marque)
        fd.append('nom', data.nom)
        if (data.prix) {
            fd.append('prix', Number(data.prix).toFixed(2))
        }
        fd.append('type', data.type)

        return axios.post('products', fd)
            .catch((err) => console.log(err))
    },
    editProduct ({ commit }, data) {
        const fd = new FormData()
        const id = data._id

        fd.append('_id', id)
        fd.append('categorie', data.categorie)
        fd.append('description', data.description)
        fd.append('disponibilite', false)
        // fd.append('image', data.image, data.image.name)
        fd.append('image', null)
        fd.append('marque', data.marque)
        fd.append('nom', data.nom)
        fd.append('prix', Number(data.prix).toFixed(2))
        fd.append('type', data.type)

        return axios.patch(`products/${id}`, fd)
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
    }
  }

  export default actions
