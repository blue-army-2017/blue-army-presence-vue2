<template>
    <md-content>
        <h1>{{ seasonName }}</h1>
    </md-content>
</template>

<script>
    import { getSeasonRef } from '../../../api';

    export default {
        data: () => ({
            seasonName: '',
            games: []
        }),
        computed: {
            seasonId() {
                return this.$route.params.seasonId;
            }
        },
        created() {
            getSeasonRef().child(this.seasonId).on('value', snapshot => {
                if (this.seasonName === '') {
                    this.seasonName = this.$t('app.seasonGames.title', {name: snapshot.val().name});
                }
                this.games = snapshot.val().games;
            });
        }
    }
</script>

<style scoped>
</style>
