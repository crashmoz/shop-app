<template>
	<div>
		<v-container grid-list-sm class="ma-0 pa-0">
			<div class="subtitle-1 pa-4 text-grey-darken-1">
				All Category
			</div>

			<v-row dense>
				<v-col v-for="(category) in categories" :key="`category-` + category.id" cols="6" md="4">
					<v-card :to="'category/' + category.slug">
						<v-img :src="getImage(category.image)" class="text-white align-end">
							<v-card-title class="fill-height text-wrap">
								{{ category.name }}
							</v-card-title>
						</v-img>
					</v-card>
				</v-col>
			</v-row>

			<v-pagination :length="lengthPage" v-model="page" @click="getCategories" :total-visible="5"></v-pagination>
		</v-container>
	</div>
</template>
<script setup>
import axios from 'axios';
import { ref } from 'vue';

const categories = ref([]);
const page = ref(0);
const lengthPage = ref(0);

async function getCategories() {
	try {
		const res = await axios.get('categories?page=' + page.value)
		const { data } = res.data.data;
		const { current_page } = res.data.data;
		const { last_page } = res.data.data;

		categories.value = data
		page.value = current_page;
		lengthPage.value = last_page;
	} catch (error) {
		let { responses } = error
		console.log(responses);
	}
}

getCategories();

function getImage(image) {
	if (image != null && image.length > 0) {
		return "http://localhost/apishop/" + image
	}

	return "/img/unavailable.png"
}
</script>