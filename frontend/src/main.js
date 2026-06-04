import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import IndexView from './views/IndexView.vue'
import BookingView from './views/BookingView.vue'
import StatusView from './views/StatusView.vue'
import AdminView from './views/AdminView.vue'

const routes = [
  { path: '/', name: 'index', component: IndexView },
  { path: '/booking', name: 'booking', component: BookingView },
  { path: '/status', name: 'status', component: StatusView },
  { path: '/admin', name: 'admin', component: AdminView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')