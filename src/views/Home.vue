<template>
    <div>
        <ul id="example-1">
            <li v-for="item in locations" :key="item.name">
                <router-link v-bind:to="'zones/' + item.name">
                    <b-card
                        v-bind:title="item.name"
                        v-bind:img-src="item.imageUrl"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2"
                    >
                        <p
                            class="card-text"
                        >Inside {{item.insideTemperature == null ? "n/a" : item.insideTemperature}}&#8451;</p>
                        <p
                            class="card-text"
                        >Outside {{item.outsideTemperature == null ? "n/a" : item.outsideTemperature}}&#8451;</p>
                    </b-card>
                </router-link>
            </li>
        </ul>
    </div>
</template>


<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { mount } from "@vue/test-utils";
import store from "@/store/store";
export default Vue.extend({
    computed: {
        ...mapState({
            locations: "DashboardLocations"
        })
    },

    async mounted() {
        store.dispatch("FETCH_DASHBOARD_LOCATIONS");
    }
});
</script>

<style scoped>
.card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    border: 1px solid black;
    margin: 0 auto;
    margin-top: 10px;
    background: rgb(2, 0, 36);
    background: linear-gradient(
        90deg,
        rgba(2, 0, 36, 1) 0%,
        rgba(245, 245, 250, 1) 0%,
        rgba(27, 176, 207, 1) 100%
    );
}
ul {
    list-style-type: none;
    text-align: center;
    padding: 0;
    margin: 0;
}

li {
    display: inline;
}

/* Add some padding inside the card container */
</style>

