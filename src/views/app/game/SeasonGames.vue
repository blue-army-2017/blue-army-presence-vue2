<template>
    <md-content class="season-games-container">
        <md-progress-spinner v-if="loading" md-mode="indeterminate" />

        <md-content v-else class="games-container">
            <h2 class="season-title">{{ seasonName }}</h2>

            <md-empty-state v-if="games.length === 0"
                            md-icon="sports_hockey"
                            :md-label="$t('app.seasonGames.emptyStateLabel')" />
            <md-card v-for="game in games" :key="game.id" class="game-card" md-with-hover>
                <md-card-header>
                    <div class="md-title">{{ game.home ? homeSign : awaySign }} {{game.opponent }}</div>
                    <div class="md-subtitle">{{ game.date }}</div>
                </md-card-header>

                <md-card-actions>
                    <md-button class="md-icon-button">
                        <md-icon>delete_forever</md-icon>
                    </md-button>
                    <md-button class="md-icon-button">
                        <md-icon>edit</md-icon>
                    </md-button>
                </md-card-actions>
            </md-card>

            <md-button class="md-fab md-fab-bottom-left">
                <md-icon>add</md-icon>
            </md-button>
        </md-content>
    </md-content>
</template>

<script>
    import { getSeasonRef } from '../../../api';

    export default {
        data: () => ({
            seasonName: '',
            games: [],
            loading: true
        }),
        computed: {
            seasonId() {
                return this.$route.params.seasonId;
            },
            homeSign() {
                return this.$t('app.seasonGames.homeSign');
            },
            awaySign() {
                return this.$t('app.seasonGames.awaySign');
            }
        },
        methods: {},
        created() {
            getSeasonRef().child(this.seasonId).on('value', snapshot => {
                this.loading = false;
                if (this.seasonName === '') {
                    this.seasonName = this.$t('app.seasonGames.title', {name: snapshot.val().name});
                }
            });
        }
    }
</script>

<style scoped>
    .season-games-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .games-container {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;

        width: 100%;
    }

    .season-title {
        text-align: center;
        flex-basis: 100%;
    }

    .game-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        width: 250px;
        margin-bottom: 15px;
    }
</style>