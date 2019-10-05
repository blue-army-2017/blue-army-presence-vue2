<template>
    <md-content class="seasons-container">
        <md-content class="seasons-list">
            <h2 class="seasons-header">{{ $t('app.seasons.seasonSelect') }}</h2>

            <md-progress-spinner v-if="loading" md-mode="indeterminate" />
            <md-empty-state v-if="seasons.length === 0 && !loading"
                            md-icon="calendar_today"
                            :md-label="$t('app.seasons.emptySeasons')">
                <md-button class="md-accent" @click="dialogActive = true">{{ $t('app.seasons.newSeason') }}</md-button>
            </md-empty-state>

            <ul v-if="seasons.length > 0" class="seasons-button-list">
                <li class="seasons-button-list-item" v-for="season in seasons" :key="season.id">
                    <md-button class="season-button" :to="{name: 'seasonGames', params: {seasonId: season.id}}">
                        {{ season.name }}
                    </md-button>
                </li>
                <li v-if="!isCurrentSeasonPresent" class="seasons-button-list-item">
                    <md-button class="season-button md-accent"
                               @click="dialogActive = true">
                        {{ $t('app.seasons.newSeason') }}
                    </md-button>
                </li>
            </ul>
        </md-content>

        <md-dialog-confirm :md-active.sync="dialogActive"
                           :md-title="$t('app.seasons.dialogTitle', {name: currentSeasonName})"
                           :md-cancel-text="$t('app.seasons.dialogCancel')"
                           :md-confirm-text="$t('app.seasons.dialogConfirm')"
                           @md-cancel="dialogActive = false"
                           @md-confirm="addNewSeason" />
    </md-content>
</template>

<script>
    import { addCurrentSeason, getCurrentSeasonName, getSeasonRef } from '../../../api';

    export default {
        data: () => ({
            currentSeasonName: '',
            seasons: [],
            loading: true,
            dialogActive: false
        }),
        computed: {
            isCurrentSeasonPresent() {
                return this.seasons.filter(season => season.name === this.currentSeasonName).length > 0;
            }
        },
        methods: {
            addNewSeason() {
                addCurrentSeason(error => {
                    // todo error handling
                    console.error(error);
                });
            }
        },
        created() {
            this.currentSeasonName = getCurrentSeasonName();
            getSeasonRef().orderByChild('name').on('value', snapshot => {
                this.seasons = [];
                snapshot.forEach(season => {
                    this.seasons.push({id: season.key, name: season.val().name});
                });
                this.loading = false;
            });
        }
    }
</script>

<style scoped>
    .seasons-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .seasons-list {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;

        width: 90%;
        max-width: 400px;
        max-height: 90%;
    }

    .seasons-button-list {
        list-style-type: none;
        padding: 0;
    }

    .seasons-button-list-item {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .seasons-header {
        width: 100%;
        text-align: center;
    }

    .season-button {
        flex-grow: 1;
    }
</style>
