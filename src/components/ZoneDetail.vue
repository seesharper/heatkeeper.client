<template>
  <b-card no-body class="mb-1">
    <b-card-header header-tag="header" class="p-1" role="tab">
      <b-btn
        block
        href="#"
        class="text-left"
        v-b-toggle="'accordion' + index"
        variant="info"
      >{{name}} {{temperature}}&#8451;/{{humidity}}%</b-btn>
    </b-card-header>
    <b-collapse v-bind:id="'accordion' + index" accordion="my-accordion" role="tabpanel">
      <b-card-body>
        <p class="card-text">I start opened because
          <code>visible</code> is
          <code>true</code>
        </p>
        <p class="card-text">sdgsds</p>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class ZoneDetail extends Vue {
  @Prop({ default: 0 })
  temperature: Number;

  @Prop({ default: 0 })
  humidity: Number;

  @Prop({ default: 0 })
  batteryLevel: Number;

  @Prop({ default: 0 })
  name: string;

  @Prop({ default: 0 })
  index: number;

  getIndex(i : number){
    return i + 1;
  }
}
</script>

<style>
</style>
