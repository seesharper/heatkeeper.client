<template>
  <div>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <ul id="example-1">
      <li v-for="item in locations" :key="item.name">
        <a v-bind:href="'zones/' + item.name">
            <div class="card">
                <h4>
                <b>{{item.name}}</b>
                </h4>
            <img src="@/assets/cabin.svg" alt="Avatar" style="width:50%">
            <div class="container">
                <p>{{item.temperature}}&#8451;/{{item.humidity}}%</p>
            </div>
            </div>
            </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { getLocations, Location } from "../web-api";

@Component
export default class Locations extends Vue {
    locations : Location[] = new Array<Location>();

    async mounted(){
        this.locations = await getLocations();
    }
}
</script>

<style scoped>
.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border: 1px solid black;
  margin: 0 auto;
  margin-top: 10px;
  width: 50%;
}
ul {
  list-style-type: none;
}

/* Add some padding inside the card container */
.container {
  padding: 10px 16px;
}
</style>
