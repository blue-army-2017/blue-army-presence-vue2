import Vue from 'vue';
import VueRouter from 'vue-router';
import { beforeEnter } from './config/routeProtection';
import Home from './views/Home.vue';
import Login from './components/auth/Login.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        beforeEnter
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        beforeEnter
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
];

export default new VueRouter({mode: 'history', routes});
