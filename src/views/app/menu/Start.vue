<template>
    <md-content class="start-container">
        <h1>{{ $t('app.start.title') }}</h1>
        <img src="../../../assets/logo.png" alt="blue_army_logo">

        <md-progress-spinner v-if="currentSeasonIdLoading" md-mode="indeterminate" />
        <md-button v-else
                   class="md-primary md-raised"
                   :to="{name: 'seasonGames', params: {seasonId: this.currentSeasonId}}">
            {{ $t('app.start.currentSeasonButton') }}
        </md-button>
    </md-content>
</template>

<script>
    import { getCurrentSeasonName, getSeasonRef } from '../../../api';

    export default {
        data: () => ({
            currentSeasonId: '',
            currentSeasonIdLoading: true
        }),
        created() {
            const currentSeasonName = getCurrentSeasonName();
            getSeasonRef().orderByChild('name').equalTo(currentSeasonName).limitToFirst(1).on('value', snapshot => {
                snapshot.forEach(season => {
                    this.currentSeasonId = season.key;
                });
                this.currentSeasonIdLoading = false;
            });
        }
    }
</script>

<style scoped>
    .start-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        height: 100%;
    }
</style>
