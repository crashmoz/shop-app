<template>
	<v-card>
		<v-toolbar color="primary" dark :elevation="8">
			<v-btn icon dark @click.native="close">
				<v-icon>mdi-close</v-icon>
			</v-btn>
			<v-toolbar-title> Your Shopping Cart! </v-toolbar-title>
		</v-toolbar>
		<v-divider></v-divider>
		<v-container fluid>
			<div v-if="cartStore.count === 0">
				<v-alert outlined color="warning" icon="mdi-cart-off">
					Keranjang belanja kosong!
				</v-alert>
			</div>
			<v-list lines="three" v-if="cartStore.count > 0">
				<template v-for="(item, index) in cartStore.carts" :key="'cart' + index">
					<v-list-item :prepend-avatar="getImage(item.cover)">
						<v-list-item-title>
							{{ item.title }}
						</v-list-item-title>
						<v-list-item-subtitle>
							Rp. {{ item.price.toLocaleString('id-ID') }}
							({{ item.weight }} kg)
						</v-list-item-subtitle>
						<template v-slot:append>
							<v-btn variant="text" icon small @click.stop="cartStore.remove(item)">
								<v-icon dark color="error">mdi-minus-circle</v-icon>
							</v-btn>
							{{ item.quantity }}
							<v-btn variant="text" icon small @click.stop="cartStore.add(item)">
								<v-icon dark color="success">mdi-plus-circle</v-icon>
							</v-btn>
						</template>
					</v-list-item>
				</template>
			</v-list>
			<v-card class="mt-1 pa-2" elevation="4">
				<v-card-text>
					<v-row>
						<v-col class="pa-1" cols="6">
							Total Price ({{ cartStore.totalQuantity }} items) <br>
							<span class="text-h5 font-weight-bold">Rp. {{ cartStore.totalPrice.toLocaleString('id-ID') }}
							</span>
						</v-col>
						<v-col class="pa-1 text-right" cols="6">
							<v-btn variants="text" color="primary" @click="checkout"
								:disabled="cartStore.totalQuantity === 0">
								<v-icon>mdi-cart-arrow-right</v-icon> &nbsp; Checkout
							</v-btn>
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
		</v-container>
	</v-card>
</template>
<script setup>
import { useCartStore } from '../stores/cart';
import { useRouter } from 'vue-router';

const emit = defineEmits(['closed']);
const cartStore = useCartStore();
const router = useRouter();

function close() {
	emit('closed', false)
}

function checkout() {
	close()
	router.push('/checkout')
}

function getImage(image) {
	if (image != null && image.length > 0) {
		return "http://localhost/apishop/" + image
	}

	return "/img/unavailable.png"
}
</script>