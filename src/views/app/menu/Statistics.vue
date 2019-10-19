<template>
    <md-content v-if="dataLoading" class="statistics-container">
        <md-progress-spinner md-mode="indeterminate" />
    </md-content>
    <md-content v-else class="statistics-container">
        <h1>Statistiken</h1>
        <games-chart :member-data="memberData" />
    </md-content>
</template>

<script>
    import { getCurrentSeasonName, getMemberRef, getSeasonRef } from '../../../api';
    import { GamesChart } from '../../../components/app/statistics';

    export default {
        data: () => ({
            memberData: [],
            dataLoading: true
        }),
        components: {
            GamesChart
        },
        created() {
            const memberData = [];
            getSeasonRef().orderByChild('name').equalTo(getCurrentSeasonName()).limitToFirst(1).on('value', seasonSnapshot => {
                getMemberRef().orderByChild('lastName').on('value', memberSnapshot => {
                    memberSnapshot.forEach(member => {
                        const memberName = `${member.val().lastName}, ${member.val().firstName}`;
                        const homeGames = [];
                        const awayGames = [];
                        seasonSnapshot.forEach(season => {
                            season.child('games').forEach(game => {
                                game.child('presentMembers').forEach(presentMember => {
                                    if (presentMember.val().memberId === member.key) {
                                        if (game.val().home) {
                                            homeGames.push(game.key);
                                        } else {
                                            awayGames.push(game.key);
                                        }
                                    }
                                })
                            });
                            memberData.push([memberName, homeGames.length, awayGames.length]);
                        });
                    });
                });
                this.memberData = memberData;
                this.dataLoading = false;
            });
        }
    }
</script>

<style scoped>
    .statistics-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
