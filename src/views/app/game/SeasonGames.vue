<template>
    <md-content>
        <h1>{{ seasonId }}</h1>
    </md-content>
</template>

<script>
    export default {
        data: () => ({}),
        computed: {
            seasonId() {
                return this.$route.params.seasonId;
            }
        }
    }
</script>

<style scoped>
</style>
