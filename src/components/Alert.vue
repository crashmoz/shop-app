<template>
    <v-snackbar v-model="alertStore.status" :color="alertStore.color" multi-line location="top" timeout="2000">
        {{ alertStore.text }}
        <template v-slot:actions>
            <v-btn dark variant="text" @click.native="close">
                <v-icon>mdi-close-circle</v-icon>
            </v-btn>
        </template>
    </v-snackbar>
</template>
<script setup>
import { useAlertStore } from '@/stores/alert';

const alertStore = useAlertStore();

function close() {
    alertStore.set({ status: false })
}

</script>