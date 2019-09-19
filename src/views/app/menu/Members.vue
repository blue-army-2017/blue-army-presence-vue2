<template>
    <md-content class="member-content">
        <member-table :title="$t('app.menu.members.title-active-members')" :members="members" />

        <edit-member-dialog :event-name="addMemberEventName" :create="true" />

        <md-button class="md-fab md-fab-bottom-right" @click="showAddDialog">
            <md-icon>add</md-icon>
        </md-button>
    </md-content>
</template>

<script>
    import { EditMemberDialog, MemberTable } from '../../../components';
    import { getMemberRef } from '../../../api';
    import { eventBus } from '../../../eventBus';

    export default {
        data: () => ({
            members: [],
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
        },
        created() {
            getMemberRef().on('value', snapshot => {
                this.members = [];
                snapshot.forEach(member => {
                    this.members.push(member);
                });
            });
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
