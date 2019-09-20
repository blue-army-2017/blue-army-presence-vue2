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
            <md-button v-if="create" :disabled="!isDataValid" @click="createMember">
                {{ $t('app.members.dialog.edit.button-confirm-add') }}
            </md-button>
            <md-button v-else :disabled="!isDataValid" @click="editMember">
                {{ $t('app.members.dialog.edit.button-confirm-edit') }}
            </md-button>
        </md-dialog-actions>

        <md-dialog-confirm :md-active.sync="error"
                           :md-content="$t('app.members.dialog.edit.error-message')"
                           :md-confirm-text="$t('app.members.dialog.edit.error-confirm')"
                           @md-confirm="error = false" />
    </md-dialog>
</template>

<script>
    import { eventBus } from '../../../eventBus';
    import { addMember, updateMemberName } from '../../../api';

    export default {
        data: () => ({
            active: false,
            memberId: '',
            firstName: '',
            lastName: '',
            error: false
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
        computed: {
            isDataValid() {
                return (this.firstName.trim() !== '' && this.lastName.trim() !== '')
                    && (this.create || this.memberId !== '');
            }
        },
        methods: {
            createMember() {
                addMember(this.firstName.trim(), this.lastName.trim())
                    .catch(error => {
                        console.log(error);
                        this.error = true;
                    });
                this.active = false;
            },
            editMember() {
                updateMemberName(this.memberId, this.firstName.trim(), this.lastName.trim())
                    .catch(error => {
                        console.log(error);
                        this.error = true;
                    });
                this.active = false;
            }
        },
        created() {
            eventBus.$on(this.eventName, payload => {
                if (payload) {
                    this.memberId = payload.key;
                    this.firstName = payload.val().firstName;
                    this.lastName = payload.val().lastName;
                }
                this.active = true;
            });
        }
    }
</script>

<style scoped>
    .edit-member-dialog {
        padding: 0 10px;
        max-height: 50vh;
    }
</style>
