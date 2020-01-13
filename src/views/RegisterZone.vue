<template>
    <div id="parent">
        <b-form id="registerLocationForm" @submit.prevent="onSubmit" autocomplete="off">
            <h3 class="display-8">New Zone</h3>
            <b-form-group>
                <b-form-input type="text" v-model="name" required placeholder="Name" />
            </b-form-group>
            <b-form-group>
                <b-form-input type="text" v-model="description" placeholder="Description" />
            </b-form-group>
            <b-alert variant="danger" :show="hasFailed">{{errorMessage}}</b-alert>
            <b-form-group>
                <b-spinner v-if="isBusy" label="Loading..."></b-spinner>
            </b-form-group>
            <b-form-group>
                <b-button block v-on:click="save" variant="primary">Save</b-button>
            </b-form-group>
        </b-form>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Zone, NewZone } from "../models/models";
import { createZone } from "../api/api";
import router from "../router";
export default Vue.extend({
    data: function() {
        return {
            name: "",
            descripton: ""
        };
    },

    methods: {
        save: async function() {
            const zone = {
                name: this.name,
                description: this.descripton,
                locationId: Number.parseInt(this.$route.params["id"])
            } as NewZone;
            await createZone(zone);
            router.back();
        }
    }
});
</script>