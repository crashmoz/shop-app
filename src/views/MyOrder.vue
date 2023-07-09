<template>
	<div>
		<div class="text-body-2 ml-4 my-3 text-grey">History Belanja</div>
		<v-card flat>
			<v-container>
				<v-table hover>
					<tbody>
						<tr v-for="item in items" :key="item.id">
							<td>
								Invoice: {{ item.invoice_number }}
								<div class="text-h5 text-primary font-weight-bold">
									Rp. {{ item.total_bill.toLocaleString('id-ID') }}
								</div>
								<small>date: {{ item.updated_at }}. courier: {{ item.courier_service }}</small>
							</td>
							<td>
								{{ item.status }}
							</td>
						</tr>
					</tbody>
				</v-table>
			</v-container>
		</v-card>
	</div>
</template>
<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useAlertStore } from '../stores/alert';
import axios from 'axios';

const authStore = useAuthStore();
const alertStore = useAlertStore();
const items = ref([]);

let config = {
	headers: {
		'Authorization': 'Bearer ' + authStore.user.api_token
	}
}

axios.get('my-order', config)
	.then(res => {
		let { data } = res.data
		items.value = data
	})
	.catch(err => {
		alertStore.set({
			status: true,
			text: err,
			color: 'error'
		})
	})
</script>