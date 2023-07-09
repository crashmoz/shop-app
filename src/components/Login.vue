<template>
	<v-card>
		<v-toolbar dark color="primary" :elevation="8">
			<v-btn icon dark @click.native="close">
				<v-icon>mdi-close</v-icon>
			</v-btn>
			<v-toolbar-title> Login and Start Shopping! </v-toolbar-title>
		</v-toolbar>
		<v-divider></v-divider>

		<v-container fluid>
			<v-form ref="myForm" v-model="valid" lazy-validation>
				<v-text-field v-model="email" :rules="emailRules" label="E-mail" required append-icon="mdi-email">
				</v-text-field>
				<v-text-field v-model="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					:rules="passwordRules" :type="showPassword ? 'text' : 'password'" label="Password"
					hint="At least 6 characters" counter @click:append="showPassword = !showPassword" @keyup.enter="submit">
				</v-text-field>

				<div class="text-xs-center">
					<v-btn color="blue-accent-1" :disabled="!valid" @click="submit">
						Login
						<v-icon right dark>mdi-lock-open</v-icon>
					</v-btn>
				</div>
			</v-form>
		</v-container>
	</v-card>
</template>
<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useAlertStore } from "@/stores/alert";
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const emit = defineEmits(['closed']);
const authStore = useAuthStore();
const alertStore = useAlertStore();
const myForm = ref(null);
const valid = ref(true);
const email = ref('');
const emailRules = ref([
	v => !!v || 'E-mail is required',
	v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
]);
const showPassword = ref(false);
const password = ref('');
const passwordRules = ref([
	v => !!v || 'Password required',
	v => (v && v.length >= 6) || 'Min 6 character',
]);

function close() {
	emit('closed', false)
}

function submit() {
	if (myForm.value.validate()) {
		let formData = {
			'email': email.value,
			'password': password.value
		}
		axios.post('auth/login', formData).then(res => {
			let { data } = res.data;
			authStore.setUser(data)
			if (authStore.user.id > 0) {
				alertStore.set({
					status: true,
					color: 'success',
					text: 'Login success',
				});
				if (router.query) {
					router.push(route.query.redirect)
				}
				close();
			} else {
				alertStore.set({
					status: true,
					color: 'error',
					text: 'Login failed',
				});
			}
		}).catch(err => {
			// let response = err.response;
			alertStore.set({
				status: true,
				color: 'error',
				text: err
			})
		})
	}

}

</script>