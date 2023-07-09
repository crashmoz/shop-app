import { defineStore } from "pinia";

export const useDialogStore = defineStore('dialog', {
    state: () => ({
        status: false,
        component: '',
    }),
    actions: {
        setStatus(val) {
            this.status = val
        },
        setComponent(comp) {
            this.component = comp
        }
    }
})