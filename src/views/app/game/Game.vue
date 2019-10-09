<template>
    <md-content class="game-form">
        <md-field class="input-item">
            <label>{{ $t('app.game.opponent') }}</label>
            <md-input v-model="opponent" />
        </md-field>

        <md-datepicker class="input-item" v-model="date">
            <label>{{ $t('app.game.gameDate') }}</label>
        </md-datepicker>

        <md-content class="input-item radio-group">
            <md-radio v-model="home" :value="true">{{ $t('app.game.home') }}</md-radio>
            <md-radio v-model="home" :value="false">{{ $t('app.game.away') }}</md-radio>
        </md-content>

        <md-content class="input-item radio-group">
            <md-radio v-model="mode" :value="modeRegularSeason">{{ $t('app.game.modeRegular') }}</md-radio>
            <md-radio v-model="mode" :value="modePlayoffs">{{ $t('app.game.modePlayoffs') }}</md-radio>
        </md-content>
    </md-content>
</template>

<script>
    import { GAME_MODE_PLAYOFFS, GAME_MODE_REGULAR_SEASON } from '../../../constants';

    export default {
        data: () => ({
            opponent: '',
            date: null,
            home: true,
            mode: GAME_MODE_REGULAR_SEASON
        }),
        computed: {
            modeRegularSeason: () => GAME_MODE_REGULAR_SEASON,
            modePlayoffs: () => GAME_MODE_PLAYOFFS
        },
        created() {
            this.$material.locale.firstDayOfAWeek = 1; // Monday first day of week
            this.$material.locale.dateFormat = 'dd.MM.yyyy';
        }
    }
</script>

<style scoped>
    .game-form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .input-item {
        flex-basis: 100%;
        width: 90%;
        max-width: 300px;
    }

    .radio-group {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }
</style>
