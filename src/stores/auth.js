import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: {},
    }),
    getters: {
        // user: (state) => state.user,
        guest: state => Object.keys(state.user).length === 0,
    },
    actions: {
        setUser(payload) {
            this.user = payload;
        }
    },
    persist: {
        enabled: true
    }
})