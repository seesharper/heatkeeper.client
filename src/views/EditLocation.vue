<template>
    <div id="parent">
        <h2>Location</h2>
        <b-tabs content-class="mt-3">
            <b-tab title="Location" active>
                <b-form id="registerLocationForm" @submit.prevent="onSubmit" autocomplete="off">
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
            </b-tab>
            <b-tab title="Zones">
                <b-form @submit.prevent="onSubmit">
                    <b-form-group>
                        <b-list-group>
                            <b-list-group-item
                                v-for="item in Zones"
                                v-bind:key="item.id"
                                class="d-flex justify-content-between align-items-center"
                            >
                                <span class="name">{{item.name}}</span>
                                <router-link
                                    :to="{name : 'edit-user', params : {id : item.id}}"
                                >Edit</router-link>
                            </b-list-group-item>
                        </b-list-group>
                    </b-form-group>
                    <b-form-group>
                        <b-button   
                            block
                            v-on:click="()=>$router.push({name:'register-zone', params:{id :locationId}})"
                            variant="primary"
                        >Add Zone</b-button>
                    </b-form-group>
                </b-form>
            </b-tab>
            <b-tab title="Users" disabled>
                <p>I'm a disabled tab!</p>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ZoneInfo, Zone } from "../models/models";
import { getZones } from "../api/api";
export default Vue.extend({
    data: function() {
        return {
            Zones: [] as Zone[],
            name: "",
            description: "",
            isBusy: false,
            errorMessage: "",
            hasFailed: false,
            locationId: 0
        };
    },

    async mounted() {
        this.locationId = Number.parseInt(this.$route.params["id"]);
        this.Zones = await getZones(this.locationId);
    },

    methods: {
        save: async function() {}
    }
});
</script>

<style scoped>
#parent {
    text-align: center;
    padding: 10%;
}
#test {
    text-align: right;
}
</style>