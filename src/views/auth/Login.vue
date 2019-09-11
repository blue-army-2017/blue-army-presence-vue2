<template>
    <md-card class="login-card">
        <md-card-header>Blue Army Presence - Login</md-card-header>
        <md-card-content>
            <md-field class="login-field">
                <label>E-Mail</label>
                <md-input class="login-input" v-model="email"/>
            </md-field>
            <md-field class="login-field">
                <label>Password</label>
                <md-input class="login-input" type="password" v-model="password"/>
            </md-field>
            <md-button class="login-button md-raised" @click="login">Login</md-button>
        </md-card-content>
    </md-card>
</template>

<script>
    import firebase from 'firebase/app';
    import 'firebase/auth';

    export default {
        data() {
            return {
                email: '',
                password: ''
            };
        },
        methods: {
            login() {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    }
</script>

<style scoped>
    .login-card {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 80%;
        max-width: 400px;
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
