<template>
    <md-content v-if="activeMembersLoading || presentMembersLoading" class="present-members-container">
        <md-progress-spinner md-mode="indeterminate" />
    </md-content>
    <md-content v-else class="present-members-container">
        <h4>{{ $t('app.game.presentMembers.presentMembersTitle') }}</h4>

        <h4>{{ $t('app.game.presentMembers.addPresentMember') }}</h4>

        <md-field>
            <label>{{ $t('app.game.presentMembers.selectLabel') }}</label>
            <md-select v-model="selectedMember">
                <md-option v-for="memberId in activeMemberIds" :key="memberId" :value="memberId">
                    {{ getMemberName(memberId) }}
                </md-option>
            </md-select>
        </md-field>

        <md-button class="md-raised" :disabled="selectedMember === ''" @click="addMember">
            {{ $t('app.game.presentMembers.addButton') }}
        </md-button>
    </md-content>
</template>

<script>
    import { addMemberToGame, getGamePresentMembersRef, getMemberRef } from '../../../api';

    export default {
        data: () => ({
            selectedMember: '',
            presentMembers: [],
            activeMembersLoading: true,
            presentMembersLoading: true,
            membersSnapshot: null
        }),
        props: {
            seasonId: {
                type: String,
                required: true
            },
            gameId: {
                type: String,
                required: true
            }
        },
        computed: {
            activeMemberIds() {
                let activeMemberIds = [];
                this.membersSnapshot.forEach(member => {
                    if (member.val().active) {
                        activeMemberIds.push(member.key);
                    }
                });
                return activeMemberIds;
            }
        },
        methods: {
            getMemberName(memberId) {
                const member = this.membersSnapshot.child(memberId);
                return `${member.val().lastName}, ${member.val().firstName}`;
            },
            addMember() {
                addMemberToGame(this.seasonId, this.gameId, this.selectedMember)
                    .catch(error => {
                        console.error(error);
                        // todo error handling
                    });
                this.selectedMember = '';
            }
        },
        created() {
            getMemberRef().orderByChild('lastName').on('value', snapshot => {
                this.membersSnapshot = snapshot;
                this.activeMembersLoading = false;
            });
            getGamePresentMembersRef(this.seasonId, this.gameId).on('value', snapshot => {
                this.presentMembers = [];
                snapshot.forEach(member => {
                    this.presentMembers.push({
                        id: member.key,
                        memberId: member.val().memberId
                    });
                });
                this.presentMembersLoading = false;
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
