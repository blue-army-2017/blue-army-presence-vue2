<template>
    <md-table md-card class="member-table">
        <md-table-toolbar>
            <h1>{{ title }}</h1>
        </md-table-toolbar>

        <md-table-row>
            <md-table-head>{{ $t('app.members.header-last-name') }}</md-table-head>
            <md-table-head>{{ $t('app.members.header-first-name') }}</md-table-head>
            <md-table-head>{{ $t('app.members.header-edit') }}</md-table-head>
            <md-table-head>{{ $t('app.members.header-delete') }}</md-table-head>
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
</template>

<script>
    export default {
        data: () => ({}),
        props: {
            title: {
                type: String,
                required: true
            },
            members: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style scoped>
    .member-table {
        max-width: 95%;
        flex-wrap: nowrap;
        overflow: scroll;
    }
</style>
