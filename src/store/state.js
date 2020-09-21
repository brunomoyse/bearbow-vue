/* eslint-disable prefer-const */
// ./resources/js/store/state.js
let state = {
    token: localStorage.getItem('access_token') || null,
    products: [],
    alert: {
        display: false,
        message: null
    }
}

export default state
