<template>
    <div id="parent">
        <b-form @submit.prevent="onSubmit" autocomplete="off">
            <b-form-group>
                <b-list-group>
                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                        Garage
                        <font-awesome-icon icon="edit" />
                    </b-list-group-item>
                </b-list-group>
            </b-form-group>
            <b-form-group>
                <b-button block type="submit" variant="primary">Create location</b-button>
            </b-form-group>
        </b-form>
    </div>
</template>


<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import store from "@/store/store";

@Component
export default class ManageLocations extends Vue {
    get locations() {
        return store.state.Locations;
    }

    async mounted() {
        await store.dispatch("FETCH_LOCATIONS");
        if (store.state.Locations.length == 0) {
            this.$router.push("register-location");
        }
    }
}
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