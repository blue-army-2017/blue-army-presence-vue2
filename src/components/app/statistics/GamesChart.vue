<template>
    <md-content class="chart-container">
        <GChart :settings="chartPackages"
                type="BarChart"
                :data="chartData"
                :options="chartOptions" />
    </md-content>
</template>

<script>
    import { GChart } from 'vue-google-charts';

    const HOME = 1;
    const AWAY = 2;

    export default {
        props: {
            memberData: {
                type: Array,
                required: true
            }
        },
        data: () => ({
            chartHeaderData: [],
            chartOptions: null,
            chartPackages: {packages: ['corechart', 'bar']}
        }),
        computed: {
            chartData() {
                return [this.chartHeaderData, ...this.sortMemberData(this.memberData)];
            }
        },
        methods: {
            sortMemberData(memberData) {
                return memberData.sort(this.sortByTotalGames);
            },
            sortByTotalGames(a, b) {
                return (b[HOME] + b[AWAY]) - (a[HOME] + a[AWAY]);
            }
        },
        components: {
            GChart
        },
        created() {
            this.chartHeaderData = [
                this.$t('app.statistics.gamesChart.vAxisMember'),
                this.$t('app.statistics.gamesChart.legendHome'),
                this.$t('app.statistics.gamesChart.legendAway')
            ];
            this.chartOptions = {
                title: this.$t('app.statistics.gamesChart.title'),
                chartArea: {width: '50%'},
                isStacked: true,
                hAxis: {
                    title: this.$t('app.statistics.gamesChart.xAxisTotalGames'),
                    minValue: 0,
                },
                vAxis: {
                    title: this.$t('app.statistics.gamesChart.vAxisMember')
                }
            }
        }
    }
</script>

<style scoped>
    .chart-container {
        width: 100%;
    }
</style>
