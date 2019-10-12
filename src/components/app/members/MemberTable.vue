<template>
    <md-table md-card v-model="members" class="member-table">
        <md-table-toolbar>
            <h1>{{ $t('app.members.table.title') }}</h1>

            <edit-member-dialog :event-name="editMemberEventName" />
        </md-table-toolbar>

        <md-table-empty-state v-if="loading">
            <md-progress-spinner md-mode="indeterminate" />
        </md-table-empty-state>
        <md-table-empty-state v-else
                              md-icon="people"
                              :md-label="$t('app.members.table.empty-state-header')"
                              :md-description="$t('app.members.table.empty-state-body')" />

        <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell :md-label="$t('app.members.table.header-last-name')">
                {{ item.val().lastName }}
            </md-table-cell>
            <md-table-cell :md-label="$t('app.members.table.header-first-name')">
                {{ item.val().firstName }}
            </md-table-cell>
            <md-table-cell :md-label="$t('app.members.table.header-state')">
                <md-checkbox v-model="item.val().active" disabled />
            </md-table-cell>
            <md-table-cell :md-label="$t('app.members.table.header-edit')">
                <md-button class="md-icon-button" @click="editMember(item)">
                    <md-icon>edit</md-icon>
                </md-button>
            </md-table-cell>
        </md-table-row>
    </md-table>
</template>

<script>
    import { eventBus } from '../../../eventBus';
    import { EditMemberDialog } from '.';
    import { getMemberRef } from '../../../api';

    export default {
        data: () => ({
            members: [],
            editMemberEventName: "editMember",
            loading: true
        }),
        methods: {
            editMember(member) {
                eventBus.$emit(this.editMemberEventName, member);
            }
        },
        components: {
            EditMemberDialog
        },
        created() {
            getMemberRef().orderByChild('lastName').on('value', snapshot => {
                this.members = [];
                const activeMembers = [];
                const inactiveMembers = [];
                snapshot.forEach(member => {
                    if (member.val().active) {
                        activeMembers.push(member);
                    } else {
                        inactiveMembers.push(member);
                    }
                });
                this.members = activeMembers.concat(inactiveMembers);
                this.loading = false;
            });
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
