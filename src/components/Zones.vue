<template>
    <div>Location {{ $route.params.location }}
    <Zone></Zone>
    </div>

</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { getZones, ZoneInfo } from "../web-api";
import Battery from '@/components/Battery.vue';
import Zone from '@/components/Zone.vue';

@Component({
    components: {
        Battery,
        Zone
    }
}
)
export default class Zones extends Vue{
    zones : ZoneInfo[] = new Array<ZoneInfo>();

    async mounted(){
        let locationParam = this.$route.params['location'];
        this.zones = await getZones(locationParam);
    }
}
</script>

<style>

</style>
