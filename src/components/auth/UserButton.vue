<template>
    <md-menu md-direction="bottom-start" md-align-trigger>
        <md-button class="md-icon-button" md-menu-trigger>
            <md-icon>account_circle</md-icon>
        </md-button>
        <md-menu-content>
            <md-menu-item :to="{name: 'changePassword'}">
                <md-icon>lock</md-icon>
                <span>{{ $t('auth.userButton.changePasswordButton') }}</span>
            </md-menu-item>
            <md-menu-item @click="signOut">
                <md-icon>power_settings_new</md-icon>
                <span>{{ $t('auth.userButton.logoutButton') }}</span>
            </md-menu-item>
        </md-menu-content>
    </md-menu>
</template>

<script>
    import { signOut } from '../../api';

    export default {
        data: () => ({}),
        // todo better error handling
        methods: {
            signOut() {
                signOut(error => {
                    console.error(error);
                });
            }
        }
    }
</script>

<style scoped>
</style>
