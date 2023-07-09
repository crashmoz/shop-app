<template>
    <div>
        <v-card flat>
            <v-container>
                <v-table>
                    <tr height="100">
                        <th class="text-left">Order ID</th>
                        <td>353466346</td>
                    </tr>
                    <tr>
                        <th class="text-left">Invoice Number</th>
                        <td>34234798234792837</td>
                    </tr>
                    <tr>
                        <th class="text-left">Total Bill</th>
                        <td>Rp. 100000</td>
                    </tr>
                </v-table>
            </v-container>
        </v-card>
    </div>
</template>
<script setup>
import { useDialogStore } from '../stores/dialog';
import Search from '../components/Search.vue';
import Login from '../components/Login.vue';
import { ref } from 'vue';

const dialogStore = useDialogStore();

const currentComponent = ref('Search')

const comps = {
    Search, Login
}

function changesComp(val) {
    currentComponent.value = val
    dialogStore.setComponent(val)
}

function openDialog(val) {
    dialogStore.setStatus(true)
    dialogStore.setComponent(val)
}
</script>