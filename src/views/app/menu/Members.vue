<template>
    <md-content class="member-content">
        <member-table :title="$t('app.menu.members.title-active-members')" :members="members" />
    </md-content>
</template>

<script>
    import { MemberTable } from '../../../components';

    export default {
        data: () => ({
            members: [
                {id: '1', firstName: 'Max', lastName: 'Mustermann'},
                {id: '2', firstName: 'Maria', lastName: 'Musterfrau'},
                {id: '3', firstName: 'Tom', lastName: 'Meier'}
            ]
        }),
        components: {
            MemberTable
        }
    }
</script>

<style scoped>
    .member-content {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }
</style>
