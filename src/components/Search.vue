<template>
    <v-card>
        <v-toolbar dark color="primary" :elevation="8">
            <v-btn icon dark @click="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-text-field hide-details append-icon="mdi-microphone" flat autofocus label="Search"
                prepend-inner-icon="mdi-magnify" v-model="keyword" @input="doSearch"></v-text-field>
        </v-toolbar>
        <v-card-text>
            <div v-if="keyword.length > 0" class="subtitle-1 pa-4 text-grey-darken-1">
                Result search {{ keyword }}
            </div>
            <v-alert v-if="books.length == 0 && keyword.length > 0" color="warning">
                Sorry, but no result were found.
            </v-alert>

            <!-- Show the result here -->
            <v-container grid-list-sm class="ma-0 pa-0">
                <v-row>
                    <v-col v-for="(book) in books" :key="`book` + book.id" cols="6">
                        <BookItem :book="book" />
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>
<script setup>
import { ref, watch } from 'vue';
import BookItem from './BookItem.vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const emit = defineEmits(['closed'])
const route = useRoute();
watch(route, (newRoute, oldRoute) => {
    let { slug } = route.params
    close();
})

const keyword = ref('');
const books = ref([]);

function doSearch() {
    let key = keyword.value
    if (key.length > 0) {
        axios.get('books/search/' + key).then(res => {
            let { data } = res.data
            books.value = data
        }).catch(err => {
            console.log(err);
        })
    } else {
        books.value = []
    }
}

function close() {
    emit('closed', false)
}
</script>