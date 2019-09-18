<template>
    <md-content class="member-content">
        <md-table md-card class="member-table">
            <md-table-toolbar>
                <h1>{{ $t('app.menu.members.title-active-members') }}</h1>
            </md-table-toolbar>

            <md-table-row>
                <md-table-head>Name</md-table-head>
                <md-table-head>Vorname</md-table-head>
                <md-table-head>Bearbeiten</md-table-head>
                <md-table-head>Löschen</md-table-head>
            </md-table-row>

            <md-table-row :key="member.id" v-for="member in members">
                <md-table-cell>{{ member.lastName }}</md-table-cell>
                <md-table-cell>{{ member.firstName }}</md-table-cell>
                <md-table-cell>
                    <md-button class="md-icon-button">
                        <md-icon>edit</md-icon>
                    </md-button>
                </md-table-cell>
                <md-table-cell>
                    <md-button class="md-icon-button">
                        <md-icon>delete</md-icon>
                    </md-button>
                </md-table-cell>
            </md-table-row>
        </md-table>
    </md-content>
</template>

<script>
    export default {
        data: () => ({
            members: [
                {id: '1', firstName: 'Max', lastName: 'Mustermann'},
                {id: '2', firstName: 'Maria', lastName: 'Musterfrau'},
                {id: '3', firstName: 'Tom', lastName: 'Meier'}
            ]
        })
    }
</script>

<style scoped>
    .member-content {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }

    .member-table {
        max-width: 95%;
        flex-wrap: nowrap;
        overflow: scroll;
    }
</style>
