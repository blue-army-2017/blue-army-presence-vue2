<template>
    <md-content v-if="gameLoading" class="game-form">
        <md-progress-spinner md-mode="indeterminate" />
    </md-content>
    <md-content v-else class="game-form">
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

        <md-button class="md-raised" :disabled="!valuesValid" @click="saveGame">
            {{ $t('app.game.submitButton') }}
        </md-button>

        <present-members v-if="gameInDatabase" class="input-item" :game-id="gameId" />
    </md-content>
</template>

<script>
    import { getGameRef, saveGame } from '../../../api';
    import { GAME_MODE_PLAYOFFS, GAME_MODE_REGULAR_SEASON } from '../../../constants';
    import { PresentMembers } from '../../../components';

    export default {
        data: () => ({
            gameId: '',
            opponent: '',
            date: new Date().toLocaleDateString('de-DE'),
            home: true,
            mode: GAME_MODE_REGULAR_SEASON,
            gameInDatabase: false,
            gameLoading: true
        }),
        computed: {
            modeRegularSeason: () => GAME_MODE_REGULAR_SEASON,
            modePlayoffs: () => GAME_MODE_PLAYOFFS,
            seasonId() {
                return this.$route.params.seasonId;
            },
            valuesValid() {
                return this.opponent !== '' && this.date;
            }
        },
        methods: {
            saveGame() {
                saveGame(this.seasonId, this.gameId, this.opponent, this.date, this.home, this.mode)
                    .then(() => {
                        // todo show success message
                    })
                    .catch(error => {
                        console.log(error);
                        // todo error handling
                    });
            }
        },
        created() {
            this.gameId = this.$route.params.gameId;
            this.$material.locale.firstDayOfAWeek = 1; // Monday first day of week
            this.$material.locale.dateFormat = 'dd.MM.yyyy';
            getGameRef(this.seasonId, this.gameId).on('value', snapshot => {
                this.gameLoading = false;
                if (snapshot.val()) {
                    this.opponent = snapshot.val().opponent;
                    this.date = snapshot.val().date;
                    this.home = snapshot.val().home;
                    this.mode = snapshot.val().mode;
                    this.gameInDatabase = true;
                } else {
                    this.gameInDatabase = false;
                }
            });
        },
        components: {
            PresentMembers
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
