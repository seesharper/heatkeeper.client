<template>
  <div id="parent">
    <b-form
      id="registerLocationForm"
      @submit.prevent="onSubmit"
      autocomplete="off"
    >
      <h3 class="display-8">New Zone</h3>
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
      <b-alert variant="danger" :show="hasFailed">{{ errorMessage }}</b-alert>
      <b-form-group>
        <b-spinner v-if="isBusy" label="Loading..."></b-spinner>
      </b-form-group>
      <b-form-group>
        <b-button block v-on:click="save" variant="primary">Save</b-button>
      </b-form-group>
    </b-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { NewZone, ZoneInfo } from "../models/models";
import { createZone } from "../api/api";
import router from "../router";
import store from "@/store/store";
export default Vue.extend({
  data: function() {
    return {
      id: 0,
      name: "",
      description: "",
    } as ZoneInfo;
  },

  methods: {
    save: async function() {
      await store.dispatch("CREATE_ZONE", {
        id: this.id,
        name: this.name,
        description: this.description,
      } as ZoneInfo);
      router.back();
    },
  },
});
</script>
