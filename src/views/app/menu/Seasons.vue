<template>
    <md-content class="seasons-container">
        <md-content class="seasons-list">
            <h2 class="seasons-header">{{ $t('app.seasons.seasonSelect') }}</h2>

            <md-progress-spinner v-if="loading" md-mode="indeterminate" />
            <md-empty-state v-if="seasons.length === 0 && !loading"
                            md-icon="sports_hockey"
                            :md-label="$t('app.seasons.emptySeasons')">
                <md-button class="md-accent">{{ $t('app.seasons.newSeason') }}</md-button>
            </md-empty-state>

            <ul v-if="seasons.length > 0" class="seasons-button-list">
                <li class="seasons-button-list-item" v-for="season in seasons" :key="season.id">
                    <md-button class="season-button">{{ season.name }}</md-button>
                </li>
                <li v-if="!isCurrentSeasonPresent" class="seasons-button-list-item">
                    <md-button class="season-button md-accent">{{ $t('app.seasons.newSeason') }}</md-button>
                </li>
            </ul>
        </md-content>
    </md-content>
</template>

<script>
    import { getCurrentSeasonName, getSeasonRef } from '../../../api';

    export default {
        data: () => ({
            seasons: [],
            loading: true
        }),
        computed: {
            isCurrentSeasonPresent() {
                return this.seasons.filter(season => season.name === getCurrentSeasonName()).length > 0;
            }
        },
        created() {
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
