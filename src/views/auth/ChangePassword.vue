<template>
    <md-content class="change-password-site">
        <md-content class="change-password-form">
            <md-field class="form-component" :class="{'md-invalid': passwordHasError}">
                <label>{{ $t('auth.changePassword.newPassword') }}</label>
                <md-input v-model="password" md-counter="8" type="password" @keypress.enter="submitPassword" />
                <span class="md-error">
                    {{ $t('auth.changePassword.passwordErrorMessage') }}
                </span>
            </md-field>
            <md-field class="form-component" :class="{'md-invalid': passwordsNotEqual}">
                <label>{{ $t('auth.changePassword.repeatPassword') }}</label>
                <md-input v-model="passwordRevision" md-counter="8" type="password" @keypress.enter="submitPassword" />
                <span class="md-error">
                    {{ $t('auth.changePassword.passwordsNotEqualMessage') }}
                </span>
            </md-field>
            <md-button ref="submitButton"
                       class="md-raised md-primary"
                       @click="changePassword"
                       :disabled="changePasswordDisabled">
                {{ $t('auth.changePassword.submitPassword') }}
            </md-button>
        </md-content>

        <md-button class="md-fab md-fab-bottom-left" @click="back">
            <md-icon>arrow_back</md-icon>
        </md-button>

        <md-snackbar md-position="center" :md-duration="Infinity" :md-active.sync="snackbarActive" md-persistent>
            <span>{{ snackbarMessage }}</span>
            <md-button class="md-primary" @click="snackbarActive = false">
                {{ $t('auth.changePassword.snackbarButton') }}
            </md-button>
        </md-snackbar>
    </md-content>
</template>

<script>
    import { changePassword } from '../../api';

    export default {
        data: () => ({
            password: '',
            passwordRevision: '',
            snackbarMessage: '',
            snackbarActive: false
        }),
        computed: {
            passwordHasError() {
                return this.password.length < 8;
            },
            passwordsNotEqual() {
                return this.password !== this.passwordRevision;
            },
            changePasswordDisabled() {
                return this.passwordHasError || this.passwordsNotEqual;
            }
        },
        methods: {
            changePassword() {
                changePassword(this.password, () => {
                    this.snackbarMessage = this.$t('auth.changePassword.snackbarSuccessMessage');
                    this.snackbarActive = true;
                }, error => {
                    console.error(error);
                    this.snackbarMessage = this.$t('auth.changePassword.snackbarErrorMessage');
                    this.snackbarActive = true;
                });
            },
            submitPassword() {
                if (!this.changePasswordDisabled) {
                    this.changePassword();
                }
            },
            back() {
                this.$router.back();
            }
        }
    }
</script>

<style scoped>
    .change-password-site {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .change-password-form {
        width: 80%;
        max-width: 400px;
    }
</style>
