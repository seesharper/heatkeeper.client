<template>
  <div id="parent">
    <b-form
      id="registerLocationForm"
      @submit.prevent="onSubmit"
      autocomplete="off"
    >
      <h3 class="display-8">New Location</h3>
      <b-form-group>
        <b-form-input type="text" v-model="name" required placeholder="Name" />
      </b-form-group>
      <b-form-group>
        <b-form-input
          type="text"
          v-model="description"
          placeholder="Description"
        />
      </b-form-group>

      <b-form-group>
        <b-button block v-on:click="save" variant="primary"
          >Create location</b-button
        >
      </b-form-group>
    </b-form>
  </div>
</template>

<script lang="ts">
import { HttpClient } from "@/HttpClient";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import store from "../store/store";
import router from "@/router";
import { LocationInfo } from "../models/models";
export default Vue.extend({
  data: function() {
    return {
      name: "",
      description: "",
    };
  },
  methods: {
    save: async function() {
      const location = {
        name: this.name,
        description: this.description,
      } as LocationInfo;

      await store.dispatch("CREATE_LOCATION", location);
      if (!store.state.HasFailed) {
        await router.push("manage-locations");
      }
    },
  },
});
</script>
