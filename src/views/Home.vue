<template>
    <div class="home">
        <Locations></Locations>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Locations from "@/components/Locations.vue";
import Zones from "@/components/Zones.vue";
import Battery from "@/components/Battery.vue";

@Component({
    components: {
        Locations,
        Zones,
        Battery
    }
})
export default class Home extends Vue {}
</script>
