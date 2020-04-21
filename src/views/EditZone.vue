<template>
    <div id="parent">
        <h2>Zone</h2>
        <b-tabs content-class="mt-3">
            <b-tab title="Zone" active>
                <b-form id="editZoneForm" @submit.prevent="onSubmit" autocomplete="off">
                    <b-form-group>
                        <b-form-input type="text" v-model="name" required placeholder="Name" />
                    </b-form-group>
                    <b-form-group>
                        <b-form-input type="text" v-model="description" placeholder="Description" />
                    </b-form-group>
                    <b-form-group>
                        <b-input-group>
                            <b-form-checkbox
                                v-model="isDefaultOutsideZone"
                                switch
                            >Use as default outside zone</b-form-checkbox>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group>
                        <b-input-group>
                            <b-form-checkbox
                                v-model="isDefaultInsideZone"
                                switch
                            >Use as default inside zone</b-form-checkbox>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group>
                        <b-button block v-on:click="save" variant="primary">Save</b-button>
                    </b-form-group>
                    <b-form-group>
                        <b-button block v-b-modal.confirmDelete variant="danger">Delete</b-button>
                    </b-form-group>
                </b-form>
            </b-tab>
            <b-tab title="Sensors">
                <b-form @submit.prevent="onSubmit">
                    <b-form-group>
                        <b-list-group>
                            <b-list-group-item
                                v-for="item in sensors"
                                v-bind:key="item.id"
                                class="d-flex justify-content-between align-items-center"
                            >
                                <span class="name">{{ item.name }}</span>
                                <router-link
                                    :to="{ name: 'edit-user', params: { id: item.id } }"
                                >Edit</router-link>
                            </b-list-group-item>
                        </b-list-group>
                    </b-form-group>
                </b-form>
            </b-tab>
        </b-tabs>
        <b-modal id="confirmDelete" centered title="Delete Zone" @ok="deleteZone">
            <p class="my-4">Warning! Are you sure that you want to delete this zone.</p>
        </b-modal>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ZoneInfo, ZoneDetails } from "../models/models";
import { getZones } from "../api/api";
import store from "@/store/store";
import { mapState } from "vuex";
import router from "../router";
export default Vue.extend({
    data: function() {
        return {
            id: 0,
            name: "",
            description: "",
            isDefaultOutsideZone: false,
            isDefaultInsideZone: false
        };
    },

    computed: {
        ...mapState({
            sensors: "SelectedSensors"
        })
    },

    async mounted() {
        this.id = Number.parseInt(this.$route.params["id"]);
        await store.dispatch("FETCH_SELECTED_ZONE", this.id);
        this.name = store.state.SelectedZone.name;
        this.description = store.state.SelectedZone.description;
        this.isDefaultOutsideZone =
            store.state.SelectedZone.isDefaultOutsideZone;
        this.isDefaultInsideZone = store.state.SelectedZone.isDefaultInsideZone;
    },

    methods: {
        save: async function() {
            const updatedZone = {
                id: this.id,
                name: this.name,
                description: this.description,
                isDefaultOutsideZone: this.isDefaultOutsideZone,
                isDefaultInsideZone: this.isDefaultInsideZone
            } as ZoneDetails;

            await store.dispatch("UPDATE_ZONE", updatedZone);
        },
        deleteZone: async function() {
            await store.dispatch("DELETE_ZONE", this.id);
            router.back();
        }
    },

    // Make these properties mutually exclusive
    watch: {
        isDefaultOutsideZone: function(value: boolean, oldValue: boolean) {
            if (value) {
                this.isDefaultInsideZone = false;
            }
        },
        isDefaultInsideZone: function(value: boolean, oldValue: boolean) {
            if (value) {
                this.isDefaultOutsideZone = false;
            }
        }
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
