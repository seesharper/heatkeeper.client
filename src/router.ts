import { register } from 'register-service-worker';
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Zones from './components/Zones.vue';
import Login from './views/Login.vue';
import Users from './views/Users.vue';
import Register from './views/Register.vue';
import RegisterLocation from './views/RegisterLocation.vue';
import ManageLocations from './views/ManageLocations.vue';
import RegisterUser from './views/RegisterUser.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/zones/:location',
      name: 'zones',
      component: Zones,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/register-user',
      name: 'register-user',
      component: RegisterUser
    },
    {
      path: '/edit-user',
      name: 'edit-user',
      component: RegisterUser
    },
    {
      path: '/manageLocations',
      name: 'manageLocations',
      component: ManageLocations
    },
    {
      path: '/register-location',
      name: 'register-location',
      component: RegisterLocation,
      meta: {
        requiresAuth: true
      }
    }
  ]
});
