<template>
    <md-app class="app-home" md-waterfall md-mode="fixed">
        <md-app-toolbar class="md-primary">
            <div class="md-toolbar-section-start">
                <md-button v-if="currentWidth < 600" class="md-icon-button app-menu-button"
                           @click="menuVisible = !menuVisible">
                    <md-icon>menu</md-icon>
                </md-button>
                <span class="md-title">{{ $t('app.home.title') }}</span>
            </div>
            <div class="md-toolbar-section-end">
                <user-button/>
            </div>
        </md-app-toolbar>

        <md-app-drawer :md-active.sync="menuVisible" md-permanent="full" class="app-menu-drawer">
            <md-list>
                <md-list-item to="/">
                    <md-icon>home</md-icon>
                    <span class="md-list-item-text">{{ $t('app.home.menu-home') }}</span>
                </md-list-item>
                <md-list-item>
                    <md-icon>people</md-icon>
                    <span class="md-list-item-text">{{ $t('app.home.menu-members') }}</span>
                </md-list-item>
                <md-list-item>
                    <md-icon>sports_hockey</md-icon>
                    <span class="md-list-item-text">{{ $t('app.home.menu-games') }}</span>
                </md-list-item>
                <md-list-item>
                    <md-icon>bar_chart</md-icon>
                    <span class="md-list-item-text">{{ $t('app.home.menu-statistics') }}</span>
                </md-list-item>
            </md-list>
        </md-app-drawer>

        <md-app-content>
            <router-view/>
        </md-app-content>
    </md-app>
</template>

<script>
    import UserButton from '../../components/auth/UserButton';

    export default {
        data: () => ({
            menuVisible: false,
            currentWidth: window.innerWidth
        }),
        methods: {
            handleResize() {
                this.currentWidth = window.innerWidth;
            }
        },
        created() {
            window.addEventListener('resize', this.handleResize);
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize);
        },
        components: {
            UserButton
        }
    }
</script>

<style scoped>
    .app-home {
        width: 100%;
        height: 100%;
    }

    .app-menu-drawer {
        width: 230px;
        max-width: calc(100vw - 125px);
    }
</style>
