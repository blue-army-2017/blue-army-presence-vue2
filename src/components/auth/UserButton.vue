<template>
    <md-menu md-direction="bottom-start">
        <md-button class="md-icon-button" md-menu-trigger>
            <md-icon>account_circle</md-icon>
        </md-button>
        <md-menu-content>
            <md-menu-item @click="signOut">
                <md-icon>power_settings_new</md-icon>
                <span>Logout</span>
            </md-menu-item>
        </md-menu-content>
    </md-menu>
</template>

<script>
    import { signOut } from '../../api';

    export default {
        data: () => ({}),
        methods: {
            signOut() {
                signOut(error => {
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>

</style>
