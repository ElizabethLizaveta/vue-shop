/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

const server = 'http://localhost:3000/shop';

export default new Vuex.Store({
    state: {
        //    data: {
        //         "success": "true",
        //         "products": [
        //             {
        //                 "id": "001",
        //                 "productName": "Cyclone",
        //                 "productUrl": "https://2wheels.com/velo-26/female-velo/Pride-Pink",
        //                 "productImageUrl": "https://veliki.com.ua/files/2018/02_08/16_32/u_files_store_0_1277790.jpg",
        //                 "productPrice": "300",
        //                 "productDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        //                 "productGender": "female",
        //                 "productType": "mounting",
        //                 "productWheelSize": "26"
        //             },
        //             {
        //                 "id": "002",
        //                 "productName": "Pride Rebel",
        //                 "productUrl": "https://2wheels.com/velo-29/male-velo/Pride-Rebel",
        //                 "productImageUrl": "https://veliki.com.ua/files/2018/02_08/16_27/u_files_store_0_1269991.jpg",
        //                 "productPrice": "500",
        //                 "productDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        //                 "productGender": "unisex",
        //                 "productType": "mounting",
        //                 "productWheelSize": "28"
        //             },
        //             {
        //                 "id": "003",
        //                 "productName": "Comanche",
        //                 "productUrl": "https://2wheels.com/velo-29/male-velo/Pride-Rebel",
        //                 "productImageUrl": "https://veliki.com.ua/files/2018/02_08/16_30/u_files_store_0_1275311.jpg",
        //                 "productPrice": "450",
        //                 "productDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        //                 "productGender": "male",
        //                 "productType": "city",
        //                 "productWheelSize": "28"
        //             },
        //             {
        //                 "id": "004",
        //                 "productName": "Optimo",
        //                 "productUrl": "https://2wheels.com/velo-29/male-velo/Pride-Rebel",
        //                 "productImageUrl": "https://veliki.com.ua/files/2018/02_08/16_33/u_files_store_0_1278510.jpg",
        //                 "productPrice": "500",
        //                 "productDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        //                 "productGender": "female",
        //                 "productType": "city",
        //                 "productWheelSize": "27"
        //             }
        //         ],
        //     }, 
        data: {},
        cart: [],
        filter: {},
        totalPrice: 0,
        orderInfo: {},
        page: 1,
    },
    mutations: {
        addProduct: (state, payload) => {
            const indexes = [];
            if (state.cart.length > 0) {
                state.cart.forEach(el => {
                    indexes.push(el.product.id);
                });
                console.log(indexes);
            }
            let indexMatch = indexes.indexOf(payload.product.id);
            console.log('index match' + indexMatch);
            indexMatch == -1 ? state.cart.push(payload) : state.cart[indexMatch].counter += payload.counter;
            console.log(indexes);
        },
        removeProductFromCart: (state, index) => {
            state.cart.splice(index, 1);
        },
        setFilter: (state, payload) => {
            Object.assign(state.filter, payload);
        },
        updatePosts(state, data) {
            state.data = data
        },
        formOrder(state) {
            state.cart.forEach(el => {
                let price = el.product.productPrice * el.counter;
                console.log(price);
                state.totalPrice += price 
            }); 
        }
    },
    actions: {
        addProductToCart(context, payload) {
            context.commit('addProduct', payload);
        },
        formOrder(context) {
            context.commit('formOrder');
        },
        removeProductFromCart(context, index) {
            context.commit('removeProductFromCart', index);
        },
        setFilter(context, payload) {
            context.commit('setFilter', payload);
        },
        getData: async (context) => {

            let url = `?`;
            let URL = '';
            let obj = context.state.filter;

           
            if(Object.keys(obj).length === 0) {
                URL = server;
            } else {
                for (let prop in obj) {
                    console.log(prop, obj[prop]);
                    obj[prop].forEach(item => {
                        let str = `${prop}=${item}&`;
                        url = url.concat(str);
                    });
                    URL = server + url.slice(0,-1);
                   if (obj[prop].length === 0)  {
                    delete obj[prop]; 
                   } 
                } 
            }  

            console.log(URL);

            let { data } = await Axios.get(URL);
            console.log(data);
            context.commit('updatePosts', data);
        },
    },
});
