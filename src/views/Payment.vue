<template>
	<div>
		<div class="text-body-2 ml-4 mb-3 text-grey">Payment Information</div>
		<v-card class="mb-4" flat>
			<v-container v-if="cartStore.payment" class="pl-8">
				<v-table>
					<tr height="50">
						<th class="text-left">Order ID</th>
						<td>{{ cartStore.payment.order_id }}</td>
					</tr>
					<tr height="50">
						<th class="text-left">Invoice Number</th>
						<td>{{ cartStore.payment.invoice_number }}</td>
					</tr>
					<tr height="50">
						<th class="text-left">Total Bill</th>
						<td>Rp. {{ cartStore.payment.total_bill.toLocaleString('id-ID') }}</td>
					</tr>
				</v-table>
			</v-container>
		</v-card>

		<div class="text-body-2 ml-4 mb-3 text-grey">Transfer To</div>
		<v-card flat class="mb-4">
			<v-container>
				<v-table class="pl-4">
					<tr height="90">
						<td><img src="img/bca.png"></td>
						<td>BCA KCP abc No Rek 123</td>
					</tr>
					<tr>
						<td><img src="img/mandiri.png"></td>
						<td>BANK MANDIRI KCP xyz No Rek 323</td>
					</tr>
				</v-table>
			</v-container>
		</v-card>

		<v-card elevation="4">
			<v-container class="d-flex justify-center">
				<v-btn color="success" @click="finish">Finish</v-btn>
			</v-container>
		</v-card>
	</div>
</template>
<script setup>
import { useCartStore } from '../stores/cart';
import { useAlertStore } from '../stores/alert';
import { useRouter } from 'vue-router';

const router = useRouter();
const cartStore = useCartStore();
const alertStore = useAlertStore();

if (cartStore.payment === undefined) {
	alertStore.set({
		status: true,
		text: 'Payment undefined',
		color: 'warning'
	})
}

function finish() {
	alertStore.set({
		status: true,
		text: 'Transaction done',
		color: 'success'
	})
	router.push('/')
}
</script>