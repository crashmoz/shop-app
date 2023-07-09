<template>
	<div>
		<div class="text-body-2 ml-4 mb-3 text-grey">Your Profile</div>
		<v-card flat>
			<v-container>
				<v-table>
					<tbody>
						<tr v-for="(value, key) in authStore.user" :key="key">
							<td>{{ key }}</td>
							<td>{{ value }}</td>
						</tr>
					</tbody>
				</v-table>
			</v-container>
		</v-card>
	</div>
</template>
<script setup>
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
</script>