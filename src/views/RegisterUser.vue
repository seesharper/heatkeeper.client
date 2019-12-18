<template>
    <div id="parent">
        <b-form id="registerForm" @submit.prevent="onSubmit" autocomplete="off">
            <p class="h4 mb-4 text-center">New user account</p>
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
            <b-form-group>
                <b-input-group>
                    <b-input-group-prepend>
                        <b-input-group-text>
                            <font-awesome-icon icon="lock" />
                        </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input v-model="password" type="password" placeholder="Password"></b-form-input>
                </b-input-group>
            </b-form-group>
            <b-form-group>
                <b-input-group>
                    <b-input-group-prepend>
                        <b-input-group-text>
                            <font-awesome-icon icon="lock" />
                        </b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input
                        v-model="confirmedPassword"
                        type="password"
                        placeholder="Confirmed password"
                    ></b-form-input>
                </b-input-group>
            </b-form-group>
            <b-form-group>
                <b-input-group>
                    <b-form-checkbox v-model="isAdmin" switch>Administrator</b-form-checkbox>
                </b-input-group>
            </b-form-group>
            <b-alert variant="danger" :show="hasFailed">{{errorMessage}}</b-alert>
            <b-form-group>
                <b-spinner v-if="isBusy" label="Loading..."></b-spinner>
            </b-form-group>
            <b-form-group>
                <b-button block v-on:click="save" variant="primary">Create account</b-button>
            </b-form-group>
        </b-form>
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
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmedPassword: "",
            isAdmin: false,
            header: "",
            editMode: EditMode.New
        };
    },

    computed: {
        hasFailed() {
            return store.state.HasFailed;
        },
        errorMessage() {
            return store.state.ErrorMessage;
        },
        isBusy() {
            return store.state.IsBusy;
        }
    },

    methods: {
        save: async function() {
            const user = {
                email: this.email,
                firstName: this.firstName,
                lastName: this.lastName,
                isAdmin: this.isAdmin,
                password: this.password,
                confirmedPassword: this.confirmedPassword
            } as NewUser;
            await store.dispatch("CREATE_USER", user);
            if (!store.state.HasFailed) {
                await router.push("users");
            }
        }
    },

    async mounted() {
        if (this.$route.name === "edit-user") {
            this.header = "Edit User";
            this.editMode = EditMode.Update;
            const userId = Number.parseInt(this.$route.params["id"]);
            var selectedUser = store.state.Users.find(u => u.id == userId);
            if (selectedUser != null) {
                (this.email = selectedUser.email),
                    (this.firstName = selectedUser.firstName);
                this.lastName = selectedUser.lastName;
                this.isAdmin = selectedUser.isAdmin;
            }
        } else {
            this.header = "New user account";
            this.editMode = EditMode.New;
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