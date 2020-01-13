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
                        <p class="card-text">{{item.temperature}}&#8451;/{{item.humidity}}%</p>
                    </b-card>
                </router-link>
            </li>
        </ul>
        <b-modal centered ref="deleteWarning" title="Delete Location" @ok="actuallyDeleteLocation">
            <p class="my-4">Warning! Are you sure that you want to delete this location.</p>
        </b-modal>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Location, ZoneInfo } from "../models/models";
import { getLocations } from "../web-api";
import { HttpClient } from "@/HttpClient";
import store from "../store/store";

@Component
export default class Locations extends Vue {
    get locations() {
        return store.state.Locations;
    }

    async mounted() {
        await store.dispatch("FETCH_LOCATIONS");
        if (store.state.Locations.length == 0) {
            this.$router.push("register-location");
        }
    }

    async editLocation() {
        console.log("selected");
    }

    async deleteLocation() {
        const deleteWarningElement: any = this.$refs.deleteWarning;
        deleteWarningElement.show();

        console.log("selected");
    }

    async actuallyDeleteLocation() {
        console.log("delete");
    }
}
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
