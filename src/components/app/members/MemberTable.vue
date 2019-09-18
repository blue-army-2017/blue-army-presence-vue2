<template>
    <md-table md-card v-model="members" class="member-table">
        <md-table-toolbar>
            <h1>{{ title }}</h1>
        </md-table-toolbar>

        <md-table-empty-state md-icon="people"
                              md-label="Keine Mitglieder"
                              md-description="Alle Mitglieder der Blue Army werden hier aufgeführt" />

        <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell :md-label="$t('app.members.header-last-name')">{{ item.lastName }}</md-table-cell>
            <md-table-cell :md-label="$t('app.members.header-first-name')">{{ item.firstName }}</md-table-cell>
            <md-table-cell :md-label="$t('app.members.header-edit')">
                <md-button class="md-icon-button">
                    <md-icon>edit</md-icon>
                </md-button>
            </md-table-cell>
            <md-table-cell :md-label="$t('app.members.header-delete')">
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
