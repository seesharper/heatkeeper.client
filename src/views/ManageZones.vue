<template>
    <div id="parent">
        <h1>sdf</h1>
        <b-list-group>
            <b-list-group-item>
                <div>dfsdfsd</div>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import store from "@/store/store";
import { UserInfo } from "@/models/models";
import router from "../router";
export default Vue.extend({
    computed: {
        zones() {
            return store.state.Locations;
        }
    },

    async mounted() {
        const locationId = Number.parseInt(this.$route.params["id"]);
        await store.dispatch("FETCH_LOCATIONS");
    }
});
</script>
