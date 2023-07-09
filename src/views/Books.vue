<template>
	<div>
		<v-container grid-list-sm class="ma-0 pa-0">
			<div class="subtitle-1 pa-4 text-grey-darken-1">
				All Books
			</div>

			<v-row dense>
				<v-col v-for="(book) in books " :key="`book-` + book.id" cols="6">
					<v-card :to="'/book/' + book.slug">
						<v-img :src="getImage(book.cover)" class="text-white align-end">
							<v-card-title class="fill-height text-wrap">
								{{ book.title }}
							</v-card-title>
						</v-img>
					</v-card>
				</v-col>
			</v-row>
		</v-container>

		<div class="text-center">
			<v-pagination :length="lengthPage" v-model="page" @click="getBooks" total-visible="5"></v-pagination>
		</div>
	</div>
</template>
<script setup>
import axios from 'axios';
import { ref } from 'vue';

const books = ref([]);
const page = ref(0);
const lengthPage = ref(0);

async function getBooks() {
	let url = 'books?page=' + page.value;
	try {
		const res = await axios.get('books?page=' + page.value);
		const { data } = res.data.data;
		const { current_page } = res.data.data;
		const { last_page } = res.data.data;

		books.value = data;
		page.value = current_page;
		lengthPage.value = last_page
	} catch (error) {
		console.log(error);
	}
}

getBooks()

function getImage(image) {
	if (image != null && image.length > 0) {
		return "http://localhost/apishop/" + image
	}

	return "/img/unavailable.png"
}
</script>