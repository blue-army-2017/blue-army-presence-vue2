<template>
    <md-content class="member-content">
        <member-table :title="$t('app.menu.members.title-active-members')" :members="members" />
    </md-content>
</template>

<script>
    import { MemberTable } from '../../../components';
    import { getMemberRef } from '../../../api';

    export default {
        data: () => ({
            members: []
        }),
        components: {
            MemberTable
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
