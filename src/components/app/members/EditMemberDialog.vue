<template>
    <md-dialog :md-active.sync="active" class="edit-member-dialog">
        <md-dialog-title v-if="create">{{ $t('app.members.dialog.edit.title-add') }}</md-dialog-title>
        <md-dialog-title v-else>{{ $t('app.members.dialog.edit.title-edit') }}</md-dialog-title>

        <md-field>
            <label>{{ $t('app.members.table.header-first-name') }}</label>
            <md-input v-model="firstName" maxlength="30" />
        </md-field>
        <md-field>
            <label>{{ $t('app.members.table.header-last-name') }}</label>
            <md-input v-model="lastName" maxlength="30" />
        </md-field>

        <md-dialog-actions>
            <md-button @click="active = false">{{ $t('app.members.dialog.edit.button-cancel') }}</md-button>
            <md-button v-if="create">{{ $t('app.members.dialog.edit.button-confirm-add') }}</md-button>
            <md-button v-else>{{ $t('app.members.dialog.edit.button-confirm-edit') }}</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>

<script>
    import { eventBus } from '../../../eventBus';

    export default {
        data: () => ({
            active: false,
            firstName: '',
            lastName: ''
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
    .edit-member-dialog {
        padding: 0 10px;
    }
</style>
