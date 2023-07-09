<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Alert from './components/Alert.vue';
import Search from './components/Search.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Cart from './components/Cart.vue';
import { useCartStore } from './stores/cart';
import { useDialogStore } from './stores/dialog';
import { useAuthStore } from "./stores/auth";
import { useAlertStore } from "./stores/alert"
import axios from 'axios';

const drawer = ref(false);
const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const dialogStore = useDialogStore();
const authStore = useAuthStore()
const alertStore = useAlertStore();

const comp = { Search, Login, Register, Cart }

const menus = ref([
  { title: 'Home', icon: 'mdi-home', route: '/' },
  { title: 'Profile', icon: 'mdi-account', route: '/profile', auth: true },
  { title: 'My Order', icon: 'mdi-shopping', route: '/my-order', auth: true },
  { title: 'About', icon: 'mdi-account', route: '/about' },
]);

const isHome = computed(() => {
  return (route.path === '/')
});

function openDialog(val) {
  dialogStore.setComponent(val)
  dialogStore.setStatus(true)
}

function closeDialog() {
  dialogStore.setStatus(false)
  dialogStore.setComponent()
}

function getImage(image) {
  if (image != null && image.length > 0) {
    return "http://localhost/apishop/" + image
  }

  return "/img/unavailable.png"
}

function logout() {
  let config = {
    headers: { 'Authorization': 'Bearer ' + authStore.user.api_token }
  }

  axios.post('auth/logout', {}, config)
    .then(res => {
      authStore.setUser({})
      alertStore.set({
        status: true,
        color: 'success',
        text: 'Logout Successfully'
      })
    }).catch(err => {
      alertStore.set({
        status: true,
        color: 'error',
        text: err
      })
    })
}
</script>

<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" location="left">
      <div class="pa-2" v-if="authStore.guest">
        <v-btn color="primary" block class="mb-1" @click="openDialog('Login')">
          <v-icon left>mdi-lock</v-icon>
          Login
        </v-btn>
        <v-btn block color="success" @click="openDialog('Register')">
          <v-icon left>mdi-account</v-icon>
          Register
        </v-btn>
      </div>

      <v-list v-else>
        <v-list-item :prepend-avatar="getImage(authStore.user.avatar)" :title="authStore.user.name"
          :subtitle="authStore.user.email">
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <template v-for="(item, index) in menus" :key="index">
          <v-list-item v-if="!item.auth || (item.auth && !authStore.guest)" :to="item.route" :value="item"
            color="primary">
            <template v-slot:prepend>
              <v-icon>{{ item.icon }}</v-icon>
            </template>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>

      <template v-slot:append v-if="!authStore.guest">
        <div class="pa-2">
          <v-btn block color="red" dark @click="logout">
            <v-icon left>mdi-lock</v-icon>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark v-if="isHome">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Vueshop</v-toolbar-title>

      <v-btn icon variant="text" @click="openDialog('Cart')">
        <v-badge v-if="cartStore.count > 0" :content="cartStore.count" color="orange">
          <v-icon icon="mdi-cart"></v-icon>
        </v-badge>
        <v-icon v-else>mdi-cart</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-text-field slot="extension" hide-details append-icon="mdi-microphone" flat label="Search"
          prepend-inner-icon="mdi-magnify" class="ml-6 mr-6 mb-2" density="compact"
          @click="openDialog('Search')"></v-text-field>
      </template>
    </v-app-bar>

    <v-app-bar app color="primary" dark v-else>
      <v-btn icon @click.stop="router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon variant="text" @click="openDialog('Cart')">
        <v-badge v-if="cartStore.count > 0" :content="cartStore.count" color="orange">
          <v-icon icon="mdi-cart"></v-icon>
        </v-badge>
        <v-icon v-else>mdi-cart</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Alert Component -->
    <Alert />

    <!-- Search dialog component -->
    <KeepAlive>
      <v-dialog v-model="dialogStore.status" fullscreen hide-overlay transition="dialog-bottom-transition">
        <component :is="comp[dialogStore.component]" @closed="closeDialog"></component>
      </v-dialog>
    </KeepAlive>

    <v-main class="w-100 bg-grey-lighten-5">
      <v-container>
        <router-view v-slot="{ Component }">
          <v-slide-y-transition>
            <component :is="Component" />
          </v-slide-y-transition>
        </router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <div class="px-4 py-2 bg-grey-lighten-4 text-center w-100 text-black">
        &copy; {{ new Date().getFullYear() }} — <strong>Vueshop</strong>
      </div>
    </v-footer>

  </v-app>
</template>