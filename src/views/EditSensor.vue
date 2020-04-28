<template>
    <div id="parent">
        <h2>Sensor</h2>
        <b-form id="editSensorForm" @submit.prevent="onSubmit" autocomplete="off">
            <b-form-group>
                <b-form-input type="text" v-model="name" required placeholder="Name" />
            </b-form-group>
            <b-form-group>
                <b-form-input type="text" v-model="description" placeholder="Description" />
            </b-form-group>
            <b-form-group>
                <b-input-group>
                    <b-form-checkbox v-model="isActive" switch>Use as sensor in zone.</b-form-checkbox>
                </b-input-group>
            </b-form-group>
            <b-form-group>
                <b-button block v-on:click="save" variant="primary">Save</b-button>
            </b-form-group>
            <b-form-group>
                <b-button block v-b-modal.confirmDelete variant="danger">Delete</b-button>
            </b-form-group>
        </b-form>
        <b-modal id="confirmDelete" centered title="Delete Sensor" @ok="deleteSensor">
            <p class="my-4">
                Warning! Are you sure that you want to delete this sensor.
                All sensor data will be deleted.
            </p>
        </b-modal>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import store from "@/store/store";
import { SensorInfo } from "../models/models";
import router from "@/router";
export default Vue.extend({
    data: function() {
        return {
            id: 0,
            name: "",
            description: "",
            zoneId: (0 as number) || null,
            isActive: false
        };
    },

    async mounted() {
        this.id = Number.parseInt(this.$route.params["sensorId"]);
        store.commit("SET_SELECTED_SENSOR_BY_ID", this.id);
        this.name = store.state.SelectedSensor.name;
        this.description = store.state.SelectedSensor.description;
        this.zoneId = store.state.SelectedSensor.zoneId;
        this.isActive = this.zoneId != null;
    },

    methods: {
        save: async function() {
            const updatedSensor = {
                id: this.id,
                name: this.name,
                description: this.description,
                zoneId: this.zoneId
            } as SensorInfo;
            await store.dispatch("UPDATE_SENSOR", updatedSensor);
            router.back();
        },
        deleteSensor: async function() {
            await store.dispatch("DELETE_SENSOR", this.id);
            router.back();
        }
    },

    watch: {
        isActive: function(value: boolean, oldValue: boolean) {
            if (value) {
                this.zoneId = store.state.SelectedZone.id;
            } else {
                this.zoneId = null;
            }
        }
    }
});
</script>