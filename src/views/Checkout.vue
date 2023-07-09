<template>
	<div>
		<div class="text-body-2 ml-4 mb-3 text-grey">Shipping Address</div>
		<div>
			<v-card class="mb-4" elevation="4">
				<v-container>
					<v-form ref="myForm" lazy-validation>
						<v-text-field label="Name" v-model="name" required append-icon="mdi-user"></v-text-field>
						<v-textarea label="Address" v-model="address" required auto-grow rows="3"></v-textarea>
						<v-text-field label="Phone" v-model="phone" required append-icon="mdi-phone"></v-text-field>
						<v-select :items="regionStore.provinces" v-model="province_id" label="Province" item-title="province"
							item-value="id" persistent-hint single-line @update:modelValue="resetCity"></v-select>
						<v-select v-model="city_id" v-if="province_id > 0" :items="citiesByProvince" item-title="city" item-value="id"
							label="City" persistent-hint single-line></v-select>
					</v-form>
					<v-btn color="success" dark @click="saveShipping">
						<v-icon>mdi-content-save</v-icon> &nbsp;
						Save
					</v-btn>

				</v-container>
			</v-card>

			<!-- Cart -->
			<div class="text-body-2 ml-4 mb-3 text-grey">Your Shopping Cart</div>
			<div v-if="cartStore.count > 0">
				<v-card class="pt-2 mb-4" elevation="4">
					<v-list line="three" v-if="cartStore.count > 0">
						<template v-for="(item, index) in cartStore.carts" :key="'cart' + index">
							<v-list-item :prepend-avatar="getImage(item.cover)">
								<v-list-item-title>
									{{ item.title }}
								</v-list-item-title>
								<v-list-item-subtitle>
									Rp. {{ item.price.toLocaleString('id-ID') }}
									({{ item.weight }} kg)
								</v-list-item-subtitle>
							</v-list-item>
						</template>
					</v-list>
					<v-container>
						<v-card-actions>
							Subtotal
							<v-spacer></v-spacer>
							Rp. {{ cartStore.totalPrice.toLocaleString('id-ID') }}
						</v-card-actions>
					</v-container>
				</v-card>
			</div>

			<div class="text-body-2 ml-4 mb-3 text-grey">Courier</div>
			<div>
				<v-card class="mb-4" elevation="4">
					<v-container>
						<v-select v-model="courier" :items="couriers" @update:modelValue="getServices" item-title="text"
							item-value="id" label="Courier" persistent-hint></v-select>
						<v-select v-if="courier" v-model="service" :items="services" @update:modelValue="calculateBill"
							item-title="resume" item-value="service" label="Courier Service" persistent-hint></v-select>
						<v-card-actions>
							Subtotal
							<v-spacer></v-spacer>
							Rp. {{ shippingCost.toLocaleString('id-ID') }}
						</v-card-actions>
					</v-container>
				</v-card>
			</div>

			<div class="text-body-2 ml-4 mb-3 text-grey">Total</div>
			<v-card elevation="4">
				<v-container>
					<v-row>
						<v-col cols="6" class="text-center">
							Total Bill ({{ cartStore.totalQuantity }} items)
							<div class="text-h6">{{ totalBill.toLocaleString('id-ID') }}</div>
						</v-col>
						<v-col cols="6" class="text-center">
							<v-btn color="orange" @click="dialogConfirm = true" :disabled="totalBill == 0">
								<v-icon>mdi-cash</v-icon> &nbsp;
								Pay
							</v-btn>
						</v-col>
					</v-row>
				</v-container>
			</v-card>

			<template>
				<div class="d-flex justify-center">
					<v-dialog v-model="dialogConfirm" persistent max-width="290px" transition="dialog-transition">
						<v-card>
							<v-card-title class="headline">
								Confirmation
							</v-card-title>
							<v-card-text>
								If you continue, transaction will be processed
							</v-card-text>
							<div class="d-flex pa-2">
								<!-- <v-card-actions> -->
								<v-btn color="warning" @click="cancel">Cancel</v-btn>
								<v-spacer></v-spacer>
								<v-btn color="success" @click="pay">Continue</v-btn>
								<!-- </v-card-actions> -->
							</div>
						</v-card>
					</v-dialog>
				</div>
			</template>
		</div>
	</div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useRegionStore } from '../stores/region';
import { useAuthStore } from '../stores/auth';
import { useAlertStore } from '../stores/alert';
import { useCartStore } from '../stores/cart';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const alertStore = useAlertStore();
const regionStore = useRegionStore();
const cartStore = useCartStore();

const myForm = ref(null);
const name = ref('');
const address = ref('');
const phone = ref('');
const province_id = ref(0);
const city_id = ref(0);
const courier = ref('');
const couriers = ref([]);
const service = ref('');
const services = ref([]);
const shippingCost = ref(0);
const totalBill = ref(0);
const dialogConfirm = ref(false);

function init() {
	name.value = authStore.user.name
	address.value = authStore.user.address
	phone.value = authStore.user.phone
	province_id.value = authStore.user.province_id
	city_id.value = authStore.user.city_id

	if (regionStore.provinces && regionStore.provinces.length == 0) {
		axios.get('provinces')
			.then(res => {
				let { data } = res.data
				regionStore.setProvinces(data)
			})

		axios.get('cities')
			.then(res => {
				let { data } = res.data
				regionStore.setCities(data)
			})
	}
}
init()

function resetCity() {
	city_id.value = null
}

const citiesByProvince = computed(() => {
	let prov_id = province_id.value
	return regionStore.cities.filter((city) => {
		if (city.province_id == prov_id) return city
	})
})

function saveShipping() {
	let formData = new FormData()
	formData.set('name', name.value)
	formData.set('address', address.value)
	formData.set('phone', phone.value)
	formData.set('province_id', province_id.value)
	formData.set('city_id', city_id.value)

	let config = {
		headers: {
			'Authorization': 'Bearer ' + authStore.user.api_token
		}
	}

	axios.post('shipping', formData, config)
		.then(res => {
			let { data } = res
			authStore.setUser(data.data)
			alertStore.set({
				status: true,
				text: data.message,
				color: 'success'
			})
		}).catch(err => {
			alertStore.set({
				status: true,
				text: err,
				color: 'error'
			})
		})
}

if (couriers.value.length == 0) {
	axios.get('couriers')
		.then(res => {
			couriers.value = res.data.data
		})
}

function getServices() {
	service.value = ''
	let encodedCart = JSON.stringify(cartStore.carts)

	let formData = new FormData()
	formData.set('courier', courier.value)
	formData.set('carts', encodedCart)

	let config = {
		headers: {
			'Authorization': 'Bearer ' + authStore.user.api_token,
		}
	}

	axios.post('services', formData, config)
		.then(res => {
			let resp = res.data
			if (resp.status != 'error') {
				services.value = resp.data.services
				cartStore.set(resp.data.safe_carts)
			}
			console.log(resp);

			alertStore.set({
				status: true,
				text: resp.message,
				color: resp.status
			})
		}).catch(err => {
			alertStore.set({
				status: true,
				text: err,
				color: 'error'
			})
		})
}

function calculateBill() {
	let selectedService = services.value.find(item => item.service == service.value)

	shippingCost.value = selectedService.cost
	totalBill.value = parseInt(cartStore.totalPrice) + parseInt(shippingCost.value)
}

function getImage(image) {
	if (image != null && image.length > 0) {
		return "http://localhost/apishop/" + image
	}

	return "/img/unavailable.png"
}

function pay() {
	dialogConfirm.value = false
	let safeCart = JSON.stringify(cartStore.carts)
	let formData = new FormData()
	formData.set('courier', courier.value)
	formData.set('service', service.value)
	formData.set('carts', safeCart)
	let config = {
		headers: { 'Authorization': 'Bearer ' + authStore.user.api_token },
	}

	axios.post('payment', formData, config)
		.then(res => {
			let { data } = res
			if (data && data.status === 'success') {
				cartStore.setPayment(data.data)
				router.push('/payment')
				cartStore.set([])
			}

			alertStore.set({
				status: true,
				text: data.message,
				color: data.status
			})
		})
		.catch(err => {
			alertStore.set({
				status: true,
				text: err,
				color: 'error'
			})
		})
}

function cancel() {
	dialogConfirm.value = false
}
</script>