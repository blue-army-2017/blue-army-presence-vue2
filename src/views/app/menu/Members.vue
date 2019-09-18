<template>
    <md-content class="member-content">
        <md-list>
            <md-subheader>Mitglieder</md-subheader>
            <md-list-item :key="member.id" v-for="member in members" @click="member.menuOpen = !member.menuOpen">
                <md-menu md-direction="bottom-start" :md-active.sync="member.menuOpen">
                    <span>{{ member.lastName + ', ' + member.firstName }}</span>
                    <md-menu-content>
                        <md-menu-item>
                            <md-icon>edit</md-icon>
                            <span>Bearbeiten</span>
                        </md-menu-item>
                        <md-menu-item>
                            <md-icon>delete</md-icon>
                            <span>Löschen</span>
                        </md-menu-item>
                    </md-menu-content>
                </md-menu>
            </md-list-item>
        </md-list>
    </md-content>
</template>

<script>
    export default {
        data: () => ({
            members: [{id: '1', firstName: 'Max', lastName: 'Mustermann', menuOpen: false}],
        })
    }
</script>

<style scoped>
    .member-content {
        margin-left: auto;
        margin-right: auto;
    }
</style>
