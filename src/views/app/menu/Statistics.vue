<template>
    <md-content v-if="dataLoading" class="statistics-container">
        <md-progress-spinner md-mode="indeterminate" />
    </md-content>
    <md-content v-else class="statistics-container">
        <h1>{{ $t('app.statistics.title') }}</h1>
        <md-field class="season-select">
            <label>{{ $t('app.statistics.seasonSelect') }}</label>
            <md-select v-model="season">
                <md-option v-for="season in seasons" :key="season.id" :value="season.id">
                    {{ season.name }}
                </md-option>
            </md-select>
        </md-field>

        <games-chart :member-data="memberData" />

        <md-content class="mode-select">
            <md-radio v-model="mode" value="">
                <md-icon>sports_hockey</md-icon>
                <span>{{ $t('app.statistics.modeTotal') }}</span>
            </md-radio>
            <md-radio v-model="mode" :value="getRegularMode()">
                <md-icon>calendar_today</md-icon>
                <span>{{ $t('app.statistics.modeRegular') }}</span>
            </md-radio>
            <md-radio v-model="mode" :value="getPlayoffsMode()">
                <md-icon>whatshot</md-icon>
                <span>{{ $t('app.statistics.modePlayoffs') }}</span>
            </md-radio>
        </md-content>
    </md-content>
</template>

<script>
    import { GAME_MODE_PLAYOFFS, GAME_MODE_REGULAR_SEASON } from '../../../constants';
    import { getCurrentSeasonName, getMemberRef, getSeasonRef } from '../../../api';
    import { GamesChart } from '../../../components/app/statistics';

    export default {
        data: () => ({
            season: '',
            mode: '',
            seasonSnapshot: null,
            memberSnapshot: null
        }),
        computed: {
            dataLoading() {
                return !(this.seasonSnapshot && this.memberSnapshot);
            },
            seasons() {
                const seasons = [];
                this.seasonSnapshot.forEach(season => {
                    seasons.push({id: season.key, name: season.val().name});
                });
                return seasons;
            },
            memberData() {
                const memberData = [];
                this.memberSnapshot.forEach(member => {
                    const memberName = `${member.val().lastName}, ${member.val().firstName}`;
                    const homeGames = [];
                    const awayGames = [];
                    this.seasonSnapshot.child(`${this.season}/games`).forEach(game => {
                        game.child('presentMembers').forEach(presentMember => {
                            if (presentMember.val().memberId === member.key
                                && (this.mode === '' || this.mode === game.val().mode)) {
                                if (game.val().home) {
                                    homeGames.push(game.key);
                                } else {
                                    awayGames.push(game.key);
                                }
                            }
                        });
                    });
                    memberData.push([memberName, homeGames.length, awayGames.length]);
                });
                return memberData;
            }
        },
        methods: {
            getRegularMode() {
                return GAME_MODE_REGULAR_SEASON;
            },
            getPlayoffsMode() {
                return GAME_MODE_PLAYOFFS;
            }
        },
        components: {
            GamesChart
        },
        created() {
            getSeasonRef().orderByChild('name').on('value', seasonSnapshot => {
                seasonSnapshot.forEach(season => {
                    if (season.val().name === getCurrentSeasonName()) {
                        this.season = season.key;
                    }
                });
                this.seasonSnapshot = seasonSnapshot;
            });
            getMemberRef().orderByChild('lastName').on('value', memberSnapshot => {
                this.memberSnapshot = memberSnapshot;
            });
        }
    }
</script>

<style scoped>
    .statistics-container {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
    }

    .season-select {
        width: 10rem;
        margin-left: 1rem;
    }

    .mode-select {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
    }
</style>
