<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <Locations></Locations>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Locations from '@/components/Locations.vue';

@Component({
  components: {
    HelloWorld,
    Locations,
  },
})
export default class Home extends Vue {}
</script>
