import Vue from 'vue';
import VueRouter from 'vue-router';
import { Home, Login, Members, Start } from './views';
import { isUserSignedIn } from './api';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Home,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '',
                name: 'home',
                component: Start
            },
            {
                path: 'members',
                name: 'members',
                component: Members
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '*',
        redirect: {name: 'home'}
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
