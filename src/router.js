import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/auth/Login.vue';
import { isUserSignedIn } from './api';

Vue.use(VueRouter);

const routes = [
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
        component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
];

const router = new VueRouter({mode: 'history', routes});

router.beforeEach((to, from, next) => {
    const userSignedIn = isUserSignedIn();
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !userSignedIn) {
        next({name: 'login'});
    } else if (!requiresAuth && userSignedIn) {
        next({name: 'home'});
    } else {
        next();
    }
});

export default router;
