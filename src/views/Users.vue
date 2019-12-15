<template>
    <div id="parent">
        <p class="h4 mb-4 text-center">Accounts</p>
        <b-form @submit.prevent="onSubmit">
            <b-form-group>
                <b-list-group>
                    <b-list-group-item
                        v-for="item in users"
                        v-bind:key="item.id"
                        class="d-flex justify-content-between align-items-center"
                    >
                        <span class="name">{{item.email}}</span>
                        <b-btn>Edit</b-btn>
                    </b-list-group-item>
                </b-list-group>
            </b-form-group>
            <b-form-group>
                <b-button
                    block
                    v-on:click="()=>$router.push('register-user')"
                    variant="primary"
                >Create account</b-button>
            </b-form-group>
        </b-form>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store/store";
import { UserInfo } from "@/models/models";
import router from "../router";
export default Vue.extend({
    computed: {
        users() {
            return store.state.Users;
        }
    },

    async mounted() {
        await store.dispatch("FETCH_USERS");
    },

    methods: {
        async edit(user: UserInfo) {
            await router.push({
                name: "edit-user",
                params: { userId: user.id.toString() }
            });
        }
    }
});
</script>

<style scoped>
#parent {
    text-align: left;
    padding: 10%;
}
#test {
    text-align: right;
}
</style>