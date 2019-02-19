import Vue from 'vue';
import App from './App.vue';
import router from './router';
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
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUser, faEnvelope, faPhone, faUsers, faLock, faHome);
Vue.component('font-awesome-icon', FontAwesomeIcon); // registered globally
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth === true) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath },
      });
    }
  }
  next();
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
