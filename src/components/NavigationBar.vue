<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="/">HeatKeeper</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right text="Settings">
                        <!-- Using 'button-content' slot -->
                        <!-- <template slot="button-content">
                            <font-awesome-icon icon="cog" />
                        </template>-->
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                        <b-dropdown-item href="/managelocations">Locations</b-dropdown-item>
                        <b-dropdown-item href="/apikey">API key</b-dropdown-item>
                        <b-dropdown-item href="/managelocations">Settings</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component
export default class NavigationBar extends Vue {
    async mounted() {}
}
</script>