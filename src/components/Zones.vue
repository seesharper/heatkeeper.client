<template>
  <div>
    {{ $route.params.location }}
    <div role="tablist">
      <ZoneDetail
        v-for="(item, index) in zones"
        :key="item.name"
        v-bind:name="item.name"
        v-bind:temperature="item.temperature"
        v-bind:humidity="item.humidity"
        v-bind:batteryLevel="item.batteryLevel"
        v-bind:index="index"
      ></ZoneDetail>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { getZones, ZoneInfo } from "../web-api";
import Battery from "@/components/Battery.vue";
import ZoneDetail from "@/components/ZoneDetail.vue";

@Component({
  components: {
    Battery,
    ZoneDetail
  }
})
export default class Zones extends Vue {
  zones: ZoneInfo[] = new Array<ZoneInfo>();

  async mounted() {
    let locationParam = this.$route.params["location"];
    this.zones = await getZones(locationParam);
    console.log("");
  }
}
</script>

<style>
</style>
