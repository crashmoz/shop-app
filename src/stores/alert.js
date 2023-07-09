import { defineStore } from "pinia";

export const useAlertStore = defineStore('alert', {
    state: () => ({
        status: false,
        color: 'success',
        text: ''
    }),
    actions: {
        set(payload) {
            this.status = payload.status
            this.color = payload.color
            this.text = payload.text
        }
    }
});