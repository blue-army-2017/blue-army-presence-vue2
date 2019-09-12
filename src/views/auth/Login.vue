<template>
    <md-card class="login-card">
        <md-card-header>Blue Army Presence - Login</md-card-header>
        <md-card-content>
            <md-field class="login-field">
                <label>E-Mail</label>
                <md-input class="login-input" v-model="email" @keypress.enter="login"/>
            </md-field>
            <md-field class="login-field">
                <label>Password</label>
                <md-input class="login-input" type="password" v-model="password" @keypress.enter="login"/>
            </md-field>
            <md-button class="login-button md-raised" @click="login" :disabled="email === '' || password === ''">
                Login
            </md-button>
        </md-card-content>
        <md-dialog-alert :md-active.sync="loginError" md-content="Username or password not correct!"
                         md-confirm-text="Close"/>
    </md-card>
</template>

<script>
    import { signInWithEmailAndPassword } from '../../api';

    export default {
        data: () => ({
            email: '',
            password: '',
            loginError: false
        }),
        methods: {
            login() {
                signInWithEmailAndPassword(this.email, this.password, error => {
                    console.log(error);
                    this.loginError = true;
                });
            }
        }
    }
</script>

<style scoped>
    .login-card {
        top: calc((100% - 266px/* height of card */) / 2);
        margin-left: auto;
        margin-right: auto;
        width: 80%;
        max-width: 400px;
        text-align: center;
    }

    .login-field {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 80%;
    }

    .login-input {
        width: 100%;
    }

    .login-button {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
</style>
