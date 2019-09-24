<template>
    <md-content class="change-password-site">
        <md-content class="change-password-form">
            <md-field class="form-component">
                <label>{{ $t('auth.changePassword.currentPassword') }}</label>
                <md-input v-model="currentPassword" type="password" @keypress.enter="submitPassword" />
            </md-field>
            <md-field class="form-component" :class="{'md-invalid': passwordHasError}">
                <label>{{ $t('auth.changePassword.newPassword') }}</label>
                <md-input v-model="newPassword" md-counter="8" type="password" @keypress.enter="submitPassword" />
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
            <md-button v-if="!snackbarError" class="md-primary" @click="back">
                {{ $t('auth.changePassword.snackbarBack') }}
            </md-button>
            <md-button v-else class="md-primary" @click="snackbarActive = false">
                {{ $t('auth.changePassword.snackbarButton') }}
            </md-button>
        </md-snackbar>
    </md-content>
</template>

<script>
    import { changePassword } from '../../api';

    export default {
        data: () => ({
            currentPassword: '',
            newPassword: '',
            passwordRevision: '',
            snackbarMessage: '',
            snackbarError: false,
            snackbarActive: false
        }),
        computed: {
            passwordHasError() {
                return this.newPassword.length < 8;
            },
            passwordsNotEqual() {
                return this.newPassword !== this.passwordRevision;
            },
            changePasswordDisabled() {
                return this.passwordHasError || this.passwordsNotEqual || this.currentPassword === '';
            }
        },
        methods: {
            changePassword() {
                changePassword(this.currentPassword, this.newPassword, () => {
                    this.snackbarMessage = this.$t('auth.changePassword.snackbarSuccessMessage');
                    this.snackbarError = false;
                    this.snackbarActive = true;
                }, error => {
                    console.error(error);
                    this.snackbarMessage = this.$t('auth.changePassword.snackbarErrorMessage');
                    this.snackbarError = true;
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
