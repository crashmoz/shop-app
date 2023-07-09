import { defineStore } from "pinia";

export const useCartStore = defineStore('cart', {
    state: () => ({
        carts: [],
        payment: [],
    }),
    getters: {
        count(state) {
            return state.carts.length
        },
        totalPrice(state) {
            let total = 0
            state.carts.forEach((cart) => {
                total += cart.price * cart.quantity
            })
            return total
        },
        totalQuantity(state) {
            let total = 0
            state.carts.forEach((cart) => {
                total += cart.quantity
            })
            return total
        },
        totalWeight(state) {
            let total = 0
            state.carts.forEach((cart) => {
                total += cart.weight
            })
            return total
        }
    },
    actions: {
        add(payload) {
            let cartItem = this.carts.find(item => item.id === payload.id)
            if (!cartItem) {
                this.carts.push({
                    id: payload.id,
                    title: payload.title,
                    cover: payload.cover,
                    price: payload.price,
                    weight: payload.weight,
                    quantity: 1
                })
            } else {
                cartItem.quantity++
                this.update(cartItem)
            }
        },
        update(payload) {
            let idx = this.carts.indexOf(payload)
            this.carts.splice(idx, 1, {
                id: payload.id,
                title: payload.title,
                cover: payload.cover,
                price: payload.price,
                weight: payload.weight,
                quantity: payload.quantity
            })
            if (payload.quantity <= 0) {
                this.carts.splice(idx, 1)
            }
        },
        remove(payload) {
            let cartItem = this.carts.find(item => item.id === payload.id)
            if (cartItem) {
                cartItem.quantity--
                this.update(cartItem)
            }
        },
        set(payload) {
            this.carts = payload
        },
        setPayment(payload) {
            this.payment = payload
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'cart',
                storage: localStorage,
            }
        ]
    }
})