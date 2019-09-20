<template>
    <md-content class="member-content">
        <member-table />

        <edit-member-dialog :event-name="addMemberEventName" :create="true" />

        <md-button class="md-fab md-fab-bottom-right" @click="showAddDialog">
            <md-icon>add</md-icon>
        </md-button>
    </md-content>
</template>

<script>
    import { EditMemberDialog, MemberTable } from '../../../components';
    import { eventBus } from '../../../eventBus';

    export default {
        data: () => ({
            addMemberEventName: "addMember"
        }),
        components: {
            MemberTable,
            EditMemberDialog
        },
        methods: {
            showAddDialog() {
                eventBus.$emit(this.addMemberEventName);
            }
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
