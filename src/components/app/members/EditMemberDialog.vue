<template>
    <md-dialog :md-active.sync="active">
        <md-dialog-title v-if="create">{{ $t('app.members.dialog.edit.title-add') }}</md-dialog-title>
        <md-dialog-title v-else>{{ $t('app.members.dialog.edit.title-edit') }}</md-dialog-title>
    </md-dialog>
</template>

<script>
    import { eventBus } from '../../../eventBus';

    export default {
        data: () => ({
            active: false
        }),
        props: {
            eventName: {
                type: String,
                required: true
            },
            create: {
                type: Boolean,
                default: false
            }
        },
        created() {
            eventBus.$on(this.eventName, () => {
                this.active = true;
            });
        }
    }
</script>

<style scoped>
</style>
