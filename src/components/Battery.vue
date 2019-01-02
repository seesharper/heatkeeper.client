<template>
  <div class="battery">
    <div class="battery-level"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'


@Component
export default class Battery extends Vue{

    mounted(){


    }
}
</script>

<style scoped>
.battery {
  background-color: #fff;
  border: 2px solid #000;
  height: 32px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  width: 100px;
}

.battery:after {
  background-color: #fff;
  border: 2px solid #000;
  content: "";
  height: 16px;
  position: absolute;
  right: -12px;
  top: 6px;
  width: 4px;
}

.battery .battery-level {
  background-color: #666;
  height: 100%;
  width: 10%;
}
</style>
