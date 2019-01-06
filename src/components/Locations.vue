<template>
  <div>
    <router-link to="/">Home</router-link>|
    <router-link to="/about">About</router-link>
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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { getLocations, Location } from "../web-api";

@Component
export default class Locations extends Vue {
  locations: Location[] = new Array<Location>();

  async mounted() {
    this.locations = await getLocations();
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
}
ul {
  list-style-type:none;
  text-align: center;
    padding: 0;
    margin: 0;
}

li{
  display: inline;
}

/* Add some padding inside the card container */

</style>
