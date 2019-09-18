import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n'
import { configureFirebase, configureMaterial } from './config';

const firebase = configureFirebase();
configureMaterial();

Vue.config.productionTip = false;

let app = null;

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router,
            store,
            i18n,
            render: h => h(App)
        }).$mount('#app');
    }
});
