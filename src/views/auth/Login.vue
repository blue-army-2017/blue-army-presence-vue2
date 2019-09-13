<template>
    <md-card class="login-card">
        <md-card-header>{{ $t('auth.login.header') }}</md-card-header>
        <md-card-content>
            <md-field class="login-field">
                <label>{{ $t('auth.login.email') }}</label>
                <md-input class="login-input" v-model="email" @keypress.enter="login"/>
            </md-field>
            <md-field class="login-field">
                <label>{{ $t('auth.login.password') }}</label>
                <md-input class="login-input" type="password" v-model="password" @keypress.enter="login"/>
            </md-field>
            <md-button class="login-button md-raised" @click="login" :disabled="email === '' || password === ''">
                {{ $t('auth.login.loginButton') }}
            </md-button>
        </md-card-content>
        <md-dialog-alert :md-active.sync="loginError" :md-content="$t('auth.login.errorDialog.content')"
                         :md-confirm-text="$t('auth.login.errorDialog.confirm')"/>
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
