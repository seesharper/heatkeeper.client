<template>
    <div>Location {{ $route.params.location }}
        <Battery></Battery>
    </div>

</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { getZones, Zone } from "../web-api";
import Battery from '@/components/Battery.vue';

@Component({
    components: {
        Battery
    }
}
)
export default class Zones extends Vue{
    zones : Zone[] = new Array<Zone>();

    async mounted(){
        let locationParam = this.$route.params['location'];
        this.zones = await getZones(locationParam);
    }
}
</script>

<style>

</style>
