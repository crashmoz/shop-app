import { defineStore } from "pinia";

export const useRegionStore = defineStore('region', {
    state: () => ({
        provinces: [],
        cities: [],
    }),
    actions: {
        setProvinces(val) {
            this.provinces = val
        },
        setCities(val) {
            this.cities = val
        }
    }
})