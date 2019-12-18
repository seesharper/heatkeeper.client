import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './registerServiceWorker';
import {
  faUser,
  faEnvelope,
  faPhone,
  faUsers,
  faLock,
  faHome,
  faBars,
  faEdit
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Mutation } from 'vuex';
import { User } from './models/models';

library.add(
  faUser,
  faEnvelope,
  faPhone,
  faUsers,
  faLock,
  faHome,
  faBars,
  faEdit
);
Vue.component('font-awesome-icon', FontAwesomeIcon); // registered globally
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth === true) {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      });
    }
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    store.commit('INITIALIZE');
  }
}).$mount('#app');
