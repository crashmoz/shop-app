import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useAlertStore } from '../stores/alert'
import { useDialogStore } from '../stores/dialog'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import ('../views/HomeView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue'),
      meta: { auth: true }
    },
    {
      path: '/my-order',
      name: 'my-order',
      component: () => import('../views/MyOrder.vue'),
      meta: { auth: true } 
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/Categories.vue')
    },
    {
      path: '/category/:slug',
      name: 'category',
      component: () => import('../views/Category.vue')
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('../views/Books.vue')
    },
    {
      path: '/book/:slug',
      name: 'book',
      component: () => import('../views/Book.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/Checkout.vue'),
      meta: { auth: true }
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('../views/Payment.vue'),
      meta: { auth: true }
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/Test.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const alert = useAlertStore()
  const dialog = useDialogStore()

  if (to.meta.auth && auth.guest) {
    alert.set({
      status: true,
      text: 'Login first',
      color: 'error'
    })
    
    dialog.setComponent('Login')
    dialog.setStatus(true)
    next({
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

export default router
