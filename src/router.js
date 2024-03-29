import Vue from 'vue';
import VueRouter from 'vue-router';
import { ChangePassword, Game, Home, Login, Members, SeasonGames, Seasons, Start, Statistics } from './views';
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
                path: 'season/:seasonId/games',
                name: 'seasonGames',
                component: SeasonGames
            },
            {
                path: 'season/:seasonId/games/:gameId',
                name: 'game',
                component: Game
            },
            {
                path: 'statistics',
                name: 'statistics',
                component: Statistics
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
