<template>
	<div>
		<v-card v-if="book.slug">
			<v-img :src="getImage(book.cover)" class="text-white align-end" height="200" cover>
				<v-card-title class="fill-height text-wrap">
					{{ book.title }}
				</v-card-title>
			</v-img>


			<v-card-text>
				<v-table density="compact">
					<tbody>
						<tr>
							<td> <v-icon>mdi-account-tie</v-icon> Author </td>
							<td>{{ book.author }}</td>
						</tr>
						<tr>
							<td> <v-icon>mdi-bullhorn</v-icon> Publisher </td>
							<td>{{ book.publisher }}</td>
						</tr>
						<tr>
							<td> <v-icon>mdi-weight</v-icon> Weight </td>
							<td>{{ book.weight }} kg</td>
						</tr>
						<tr>
							<td> <v-icon>mdi-format-list-bulleted</v-icon> Stock </td>
							<td>{{ book.stock }} item</td>
						</tr>
						<tr>
							<td> <v-icon>mdi-eye</v-icon> Views </td>
							<td>{{ book.views }}</td>
						</tr>
						<tr>
							<td> <v-icon>mdi-cash</v-icon> Price </td>
							<td class="text-orange">Rp. {{ book.price.toLocaleString('id-ID') }}</td>
						</tr>
					</tbody>
				</v-table>
				Description: <br>
				{{ book.description }} <br>
				Categories: <v-chip v-for="category in book.categories" :key="category.id"
					:to="'/category/' + category.slug" small> {{ category.name }} </v-chip>
			</v-card-text>
			<!-- <v-card-actions> -->
			<v-btn block color="success" @click="buy" :disabled="book.stock == 0">
				<v-icon>mdi-cart-plus</v-icon> &nbsp; BUY
			</v-btn>
			<!-- </v-card-actions> -->
		</v-card>
	</div>
</template>
<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { useAlertStore } from "@/stores/alert";

const route = useRoute();
const book = ref({});
const page = ref(0);
const cartStore = useCartStore();
const alertStore = useAlertStore();

async function getBook() {
	let { slug } = route.params;
	let url = '/books/slug/' + slug;
	url = url + '?page=' + page.value;
	url = encodeURI(url);
	try {
		const res = await axios.get(url);
		let { data } = res.data;
		book.value = data;
	} catch (error) {
		console.log(error);
	}
}

getBook();

function buy() {
	cartStore.add(book.value)
	alertStore.set({
		status: true,
		color: 'success',
		text: 'Added to cart'
	});
}

function getImage(image) {
	if (image != null && image.length > 0) {
		return "http://localhost/apishop/" + image
	}

	return "/img/unavailable.png"
}
</script>