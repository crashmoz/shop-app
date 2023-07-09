<template>
    <div>
        <v-card :to="'/category/' + category.slug" v-if="category.slug">
            <v-img :src="getImage(category.image)" class="text-white align-end">
                <v-card-title class="fill-height text-wrap">
                    title
                </v-card-title>
            </v-img>
        </v-card>
        <v-container grid-list-sm class="ma-0 pa-0" v-if="books">
            <div class="subtitle-1 pa-4 text-grey-darken-1">
                All Books
            </div>

            <v-row dense>
                <v-col v-for="(book) in books" :key="`book-` + book.id" cols="6" md="4">
                    <v-card :to="'/book/' + book.slug">
                        <v-img :src="getImage(book.cover)" class="text-white align-end">
                            <v-card-title class="fill-height text-wrap">
                                {{ book.name }}
                            </v-card-title>
                        </v-img>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <v-pagination :length="lengthPage" v-model="page" @click="getCategory" :total-visible="5"></v-pagination>
    </div>
</template>
<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const category = ref({});
const books = ref([]);
const page = ref(0);
const lengthPage = ref(0);

async function getCategory() {
    let { slug } = route.params;
    let url = '/categories/slug/' + slug;
    url = url + '?page=' + page.value;
    url = encodeURI(url);
    try {
        const res = await axios.get(url);
        const { data } = res.data;
        category.value = data;
        books.value = data.books.data;
        page.value = data.books.current_page;
        lengthPage.value = data.books.last_page;
    } catch (error) {
        console.log(error);
    }
}

getCategory();

function getImage(image) {
    if (image != null && image.length > 0) {
        return "http://localhost/apishop/" + image
    }

    return "/img/unavailable.png"
}
</script>