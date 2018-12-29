<template>
  <div>
    <h1>Locations</h1>
    <ul id="example-1">
      <li v-for="item in info" :key="item.name">
        <div class="card">
          <img src="@/assets/cabin.svg" alt="Avatar" style="width:50%">
          <div class="container">
            <h4>
              <b>{{item.name}}</b>
            </h4>
            <p>{{item.description}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { getLocations, Location } from "../web-api";

export default {
  data() {
    return {
      info : new Array<Location>(),
      loading: true,
      errored: false
    }
  },

  async mounted() {
      this.info = await getLocations();
  }

};
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

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

/* Add some padding inside the card container */
.container {
  padding: 10px 16px;
}
</style>
