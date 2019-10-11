<template>
    <md-content v-if="activeMembersLoading" class="present-members-container">
        <md-progress-spinner md-mode="indeterminate" />
    </md-content>
    <md-content v-else class="present-members-container">
        <h4>{{ $t('app.game.presentMembers.addPresentMember') }}</h4>

        <md-field>
            <label>{{ $t('app.game.presentMembers.selectLabel') }}</label>
            <md-select v-model="selectedMember">
                <md-option v-for="member in activeMembers" :key="member.id" :value="member.id">
                    {{ getMemberName(member) }}
                </md-option>
            </md-select>
        </md-field>

        <md-button class="md-raised" :disabled="selectedMember === ''">
            {{ $t('app.game.presentMembers.addButton') }}
        </md-button>
    </md-content>
</template>

<script>
    import { getMemberRef } from '../../../api';

    export default {
        data: () => ({
            selectedMember: '',
            presentMembers: [],
            activeMembersLoading: true,
            membersSnapshot: null
        }),
        props: {
            gameId: {
                type: String,
                required: true
            }
        },
        computed: {
            activeMembers() {
                let activeMembers = [];
                this.membersSnapshot.forEach(member => {
                    if (member.val().active) {
                        activeMembers.push({
                            id: member.key,
                            lastName: member.val().lastName,
                            firstName: member.val().firstName
                        });
                    }
                });
                return activeMembers;
            }
        },
        methods: {
            getMemberName(member) {
                return `${member.lastName}, ${member.firstName}`;
            }
        },
        created() {
            getMemberRef().orderByChild('lastName').on('value', snapshot => {
                this.membersSnapshot = snapshot;
                this.activeMembersLoading = false;
            });
        }
    }
</script>

<style scoped>
    .present-members-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
