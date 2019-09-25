<template>
    <md-content class="seasons-container">
        <md-content class="seasons-list">
            <h2 class="seasons-header">{{ $t('app.seasons.seasonSelect') }}</h2>

            <md-empty-state v-if="seasons.length === 0"
                            md-icon="sports_hockey"
                            :md-label="$t('app.seasons.emptySeasons')">
                <md-button class="md-accent">{{ $t('app.seasons.newSeason') }}</md-button>
            </md-empty-state>
            <ul v-else class="seasons-button-list">
                <li class="seasons-button-list-item" v-for="season in seasons" :key="season.id">
                    <md-button class="season-button">{{ season.name }}</md-button>
                </li>
                <li class="seasons-button-list-item">
                    <md-button class="season-button md-accent">{{ $t('app.seasons.newSeason') }}</md-button>
                </li>
            </ul>
        </md-content>
    </md-content>
</template>

<script>
    export default {
        data: () => ({
            seasons: [
                // {id: 1, name: '2018 / 2019'},
                // {id: 2, name: '2017 / 2018'},
                // {id: 3, name: '2016 / 2017'}
            ]
        })
    }
</script>

<style scoped>
    .seasons-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    .seasons-list {
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
