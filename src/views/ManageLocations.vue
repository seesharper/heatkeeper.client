<template>
    <div id="parent">
        <p class="h4 mb-4 text-center">Locations</p>
        <b-form @submit.prevent="onSubmit">
            <b-form-group>
                <b-list-group>
                    <b-list-group-item
                        v-for="item in locations"
                        v-bind:key="item.id"
                        class="d-flex justify-content-between align-items-center"
                    >
                        <span class="name">{{ item.name }}</span>
                        <router-link
                            :to="{ name: 'edit-location', params: { locationId: item.id } }"
                        >Edit</router-link>
                    </b-list-group-item>
                </b-list-group>
            </b-form-group>
            <b-form-group>
                <b-button
                    block
                    v-on:click="() => $router.push('register-location')"
                    variant="primary"
                >New Location</b-button>
            </b-form-group>
        </b-form>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store/store";
import { UserInfo, LocationInfo } from "@/models/models";
import router from "../router";
import { mapState } from "vuex";
export default Vue.extend({
    computed: {
        locations() {
            return store.state.Locations;
        }
    },

    async mounted() {
        await store.dispatch("FETCH_LOCATIONS");
    }
});
</script>


