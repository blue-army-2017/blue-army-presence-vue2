import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// Firebase
import firebase from 'firebase/app';
import { firebaseConfig } from './config';
// Material Design
import { MdButton, MdCard, MdField } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

// Firebase Configuration
firebase.initializeApp(firebaseConfig);

// Material Configuration
Vue.use(MdButton);
Vue.use(MdCard);
Vue.use(MdField);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
