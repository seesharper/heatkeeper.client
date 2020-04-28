<template>
    <div id="parent">
        <b-form id="registerForm" @submit.prevent="onSubmit" autocomplete="off">
            <p class="h4 mb-4 text-center">Edit user account</p>
            <b-form-group>
                <b-input-group>
                    <b-input-group-prepend>
                        <b-input-group-text>
                            <font-awesome-icon icon="envelope" />
                        </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input v-model="email" type="email" placeholder="Email" required></b-form-input>
                </b-input-group>
            </b-form-group>
            <b-form-group>
                <b-input-group>
                    <b-input-group-prepend>
                        <b-input-group-text>
                            <font-awesome-icon icon="user" />
                        </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input v-model="firstName" type="text" placeholder="First name" required></b-form-input>
                </b-input-group>
            </b-form-group>
            <b-form-group>
                <b-input-group>
                    <b-input-group-prepend>
                        <b-input-group-text>
                            <font-awesome-icon icon="user" />
                        </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input v-model="lastName" type="text" placeholder="Last name"></b-form-input>
                </b-input-group>
            </b-form-group>
            <b-form-group v-if="isNotCurrentUser">
                <b-input-group>
                    <b-form-checkbox v-model="isAdmin" switch>Administrator</b-form-checkbox>
                </b-input-group>
            </b-form-group>
            <b-alert variant="danger" :show="hasFailed">{{errorMessage}}</b-alert>
            <b-form-group>
                <b-spinner v-if="isBusy" label="Loading..."></b-spinner>
            </b-form-group>
            <b-form-group>
                <b-button block v-on:click="save" variant="primary">Update account</b-button>
            </b-form-group>
            <b-form-group v-if="isNotCurrentUser">
                <b-button block v-on:click="confirmDeletion" variant="danger">Delete account</b-button>
            </b-form-group>
        </b-form>
        <b-modal centered ref="deleteWarning" title="Delete user account" @ok="deleteAccount">
            <p class="my-4">Warning! Are you sure that you want to delete this user account.</p>
        </b-modal>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import {
    DefaultUser,
    DefaultNewUser,
    UserInfo,
    NewUser,
    EditMode
} from "../models/models";
import store from "../store/store";
import router from "@/router";
export default Vue.extend({
    data: function() {
        return {
            id: 0,
            email: "",
            firstName: "",
            lastName: "",
            isAdmin: false
        };
    },

    computed: {
        hasFailed(): boolean {
            return store.state.HasFailed;
        },
        errorMessage(): string {
            return store.state.ErrorMessage;
        },
        isBusy(): boolean {
            return store.state.IsBusy;
        },
        isNotCurrentUser(): boolean {
            return store.state.User.id != this.id;
        }
    },

    methods: {
        save: async function() {
            const user = {
                email: this.email,
                firstName: this.firstName,
                lastName: this.lastName,
                isAdmin: this.isAdmin,
                id: this.id
            } as UserInfo;
            await store.dispatch("UPDATE_USER", user);
            if (!store.state.HasFailed) {
                await router.push("manageUsers");
            }
        },
        confirmDeletion: async function() {
            const deleteWarningElement: any = this.$refs.deleteWarning;
            deleteWarningElement.show();
        },
        deleteAccount: async function() {
            await store.dispatch("DELETE_USER", this.id);
            if (!store.state.HasFailed) {
                await router.push("/users");
            }
        }
    },

    async mounted() {
        const userId = Number.parseInt(this.$route.params["id"]);
        var selectedUser = store.state.Users.find(u => u.id == userId);
        if (selectedUser != null) {
            this.id = userId;
            this.email = selectedUser.email;
            this.firstName = selectedUser.firstName;
            this.lastName = selectedUser.lastName;
            this.isAdmin = selectedUser.isAdmin;
        }
    }
});
</script>

<style scoped>
#parent {
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    height: 70vh;
}

.svg {
    text-align: center;
}

#registerForm {
    width: 80%;
}
</style>