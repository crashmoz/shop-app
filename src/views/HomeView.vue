<script setup>
import BookItem from '../components/BookItem.vue';
import { ref } from "vue";
import axios from "axios";

const categories = ref([]);
const books = ref([]);

async function fetchCategories() {
  const res = await axios.get('categories/random/2');
  const { data } = res.data;
  categories.value = data;
}

async function fetchBooks() {
  await axios.get('/books/top/4').then(res => {
    const { data } = res.data;
    books.value = data;
  }).catch(err => {
    console.log(err);
  })
}

fetchBooks();
fetchCategories();

function getImage(image) {
  if (image != null && image.length > 0) {
    return "http://localhost/apishop/" + image
  }

  return "/img/unavailable.png"
}

</script>

<template>
  <div>
    <v-container grid-list-sm class="ma-0 pa-0">
      <div class="text-right">
        <v-btn small variant="text" to="/categories" class="text-blue">
          All Categories <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>

      <v-row>
        <v-col v-for="(category, index) in categories" :key="`category` + category.id" xs6>
          <v-card :to="'/category/' + category.slug">
            <v-img :src="getImage(category.image)" class="text-white align-end">
              <v-card-title class="fill-height text-wrap">
                {{ category.name }}
              </v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container grid-list-xs class="ma-0 pa-0">
      <div class="text-right">
        <v-btn small variant="text" to="/books" class="text-blue">
          All Books <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </v-container>
    <v-row>
      <v-col v-for="(book, index) in books" :key="book.id" cols="6" sm="4" md="3">
        <book-item :book="book" />
        <!-- <v-card :to="'/book/' + book.slug">
          <v-img :src="getImage(book.cover)" class="align-end text-white">
            <v-card-title class="fill-height text-wrap">
              {{ book.title }}
            </v-card-title>
          </v-img>
        </v-card> -->
      </v-col>
    </v-row>
  </div>
</template>