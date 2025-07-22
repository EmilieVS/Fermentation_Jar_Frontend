import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import LogIn from '../pages/LogIn.vue';
import SignUp from '../pages/SignUp.vue';
import Profile from '../pages/Profile.vue';

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/login', component: LogIn },
  { path: '/signup', component: SignUp },
  { path: '/profile/:id', name: "profile", component: Profile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;