import Vue from 'vue';
import VueRouter from 'vue-router';
import { ChangePassword, Home, Login, Members, Seasons, Start, WorkInProgress } from './views';
import firebase from 'firebase/app';

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
            },
            {
                path: 'season',
                name: 'seasons',
                component: Seasons
            },
            {
                path: 'statistics',
                name: 'statistics',
                component: WorkInProgress
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/user/changePassword',
        name: 'changePassword',
        component: ChangePassword,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '*',
        redirect: {name: 'home'}
    }
];

const router = new VueRouter({mode: 'history', routes});

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser) {
        next({name: 'login'});
    } else if (!requiresAuth && currentUser) {
        next({name: 'home'});
    } else {
        next();
    }
});

export default router;
