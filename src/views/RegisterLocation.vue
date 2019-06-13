<template>
    <div id="parent">
        <b-form id="registerLocationForm" @submit.prevent="onSubmit">
            <h3 class="display-8">New Location</h3>
            <b-form-group>
                <b-form-input type="text" v-model="name" required placeholder="Name"/>
            </b-form-group>
            <b-form-group>
                <b-form-input type="text" v-model="description" placeholder="Description"/>
            </b-form-group>
            <b-form-group>
                <b-button block type="submit" variant="primary">Create location</b-button>
            </b-form-group>
            <b-alert variant="danger" v-if="1 === 0">Default Alert</b-alert>
        </b-form>
    </div>
</template>


<script lang="ts">
import { HttpClient } from "@/HttpClient";
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class RegisterLocation extends Vue {
    name: string = "";
    description: string = "";

    async onSubmit(): Promise<void> {
        let test = "";

        try {
            console.log("sdfsadf");
            //let response = await HttpClient.post('api/locations', {name : this.name, description : this.description})
        } catch {}
    }
}
</script>

<style scoped>
#parent {
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    height: 100vh;
}
#registerLocationForm {
    width: 80%;
}
</style>


