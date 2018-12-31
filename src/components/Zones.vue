<template>

    <div>Location {{ $route.params.location }}</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { getZones, Zone } from "../web-api";

@Component
export default class Zones extends Vue{
    async mounted(){
        let locationParam = this.$route.params['location'];
    }
}
</script>

<style>

</style>
