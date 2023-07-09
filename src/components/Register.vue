<template>
	<v-card>
		<v-toolbar color="primary" dark>
			<v-btn icon dark @click.native="close">
				<v-icon>mdi-close</v-icon>
			</v-btn>
			<v-toolbar-title> Register! </v-toolbar-title>
		</v-toolbar>
		<v-divider></v-divider>

		<v-container fluid>
			<v-form ref="myForm" v-model="valid" lazy-validation>
				<v-text-field v-model="name" :rules="nameRules" :counter="255" label="Name" required
					append-icon="mdi-user"></v-text-field>
				<v-text-field v-model="email" :rules="emailRules" label="E-mail" required
					append-icon="mdi-email"></v-text-field>
				<v-text-field v-model="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					:rules="passwordRules" :type="showPassword ? 'text' : 'password'" label="Password"
					hint="At least 6 characters" counter @click:append="showPassword = !showPassword"></v-text-field>
				<v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']"
					label="Do You agree with our Privacy Policy?" required></v-checkbox>

				<div class="text-xs-center">
					<v-btn color="accent lighten-1" :disabled="!valid" @click="submit">
						Register
						<v-icon right dark>mdi-account-plus</v-icon>
					</v-btn>
					<v-btn @click="clear">
						Reset
						<v-icon right dark>mdi-lock-reset</v-icon>
					</v-btn>
				</div>
			</v-form>
		</v-container>
	</v-card>
</template>
<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useAlertStore } from '../stores/alert';
import axios from 'axios';

const emit = defineEmits(['closed']);
const authStore = useAuthStore();
const alertStore = useAlertStore();
const myForm = ref(null);
const valid = ref(true);
const name = ref('');
const nameRules = [
	v => !!v || 'Name is required',
	v => (v && v.length <= 255) || 'Name must be less than 255 characters',
];
const email = ref('');
const emailRules = [
	v => !!v || 'E-mail is required',
	// v => /([a-zA-Z0-9_]{1,})(@)([a-zA-Z0-9_]{2,}).([a-zA-Z0-9_]{ 2, }) +/.test(v) || 'E-mail must be valid'
	v => /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(v) || 'E-mail must be valid'
];
const showPassword = ref(false);
const password = ref('');
const passwordRules = [
	v => !!v || 'Password required.',
	v => (v && v.length >= 6) || 'Min 6 characters',
];
const checkbox = ref(false);

function close() {
	emit('closed', false)
}

function clear() {
	myForm.value.reset()
}

function submit() {
	if (myForm.value.validate()) {
		let formData = new FormData()
		formData.set('name', name.value)
		formData.set('email', email.value)
		formData.set('password', password.value)
		axios.post('auth/register', formData)
			.then(res => {
				let { data } = res.data
				authStore.setUser(data)
				alertStore.set({
					status: true,
					color: 'success',
					text: 'Register success'
				})
				close()
			}).catch(err => {
				alertStore.set({
					status: true,
					color: 'error',
					text: err
				})
			})
	}
}

</script>