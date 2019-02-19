<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">


    <ul class="navbar-nav">
      <!-- <li class="nav-item active">
        <font-awesome-icon icon="home">sd</font-awesome-icon>
      </li> -->
      <li class="nav-item active">
        <font-awesome-icon icon="home"></font-awesome-icon>
      </li>
    </ul>
</nav>
</template>


<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";


@Component
export default class NavigationBar extends Vue {
    async mounted(){

    }
}
</script>