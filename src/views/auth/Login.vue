<template>
    <md-content class="login-content">
        <md-card class="login-card">
            <md-card-header>{{ $t('auth.login.header') }}</md-card-header>
            <md-card-content class="login-card-content">
                <md-field class="login-field">
                    <label>{{ $t('auth.login.email') }}</label>
                    <md-input class="login-input" v-model="email" @keypress.enter="submitLogin" />
                </md-field>
                <md-field class="login-field">
                    <label>{{ $t('auth.login.password') }}</label>
                    <md-input class="login-input" type="password" v-model="password" @keypress.enter="submitLogin" />
                </md-field>
                <md-button class="login-button md-raised" @click="login" :disabled="loginDisabled">
                    {{ $t('auth.login.loginButton') }}
                </md-button>
            </md-card-content>
            <md-dialog-alert :md-active.sync="loginError" :md-content="$t('auth.login.errorDialog.content')"
                             :md-confirm-text="$t('auth.login.errorDialog.confirm')" />
        </md-card>
    </md-content>
</template>

<script>
    import { signInWithEmailAndPassword } from '../../api';

    export default {
        data: () => ({
            email: '',
            password: '',
            loginError: false
        }),
        computed: {
            loginDisabled() {
                return this.email === '' || this.password === '';
            }
        },
        methods: {
            login() {
                signInWithEmailAndPassword(this.email, this.password, error => {
                    console.log(error);
                    this.loginError = true;
                });
            },
            submitLogin() {
                if (!this.loginDisabled) {
                    this.login();
                }
            }
        }
    }
</script>

<style scoped>
    .login-content {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login-card {
        width: 80%;
        max-width: 400px;
        text-align: center;
    }

    .login-card-content {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    .login-field {
        width: 80%;
    }

    .login-input {
        width: 100%;
    }
</style>
