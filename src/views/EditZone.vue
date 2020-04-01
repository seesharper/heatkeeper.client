<template>
  <div id="parent">
    <h2>Location</h2>
    <b-tabs content-class="mt-3">
      <b-tab title="Zone" active>
        <b-form id="editZoneForm" @submit.prevent="onSubmit" autocomplete="off">
          <b-form-group>
            <b-form-input
              type="text"
              v-model="name"
              required
              placeholder="Name"
            />
          </b-form-group>
          <b-form-group>
            <b-form-input
              type="text"
              v-model="description"
              placeholder="Description"
            />
          </b-form-group>
          <b-form-group>
            <b-button block v-on:click="save" variant="primary">Save</b-button>
          </b-form-group>
        </b-form>
      </b-tab>
      <b-tab title="Sensors">
        <b-form @submit.prevent="onSubmit">
          <b-form-group>
            <b-list-group>
              <b-list-group-item
                v-for="item in sensors"
                v-bind:key="item.id"
                class="d-flex justify-content-between align-items-center"
              >
                <span class="name">{{ item.name }}</span>
                <router-link
                  :to="{ name: 'edit-user', params: { id: item.id } }"
                  >Edit</router-link
                >
              </b-list-group-item>
            </b-list-group>
          </b-form-group>
        </b-form>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ZoneInfo } from '../models/models';
import { getZones } from '../api/api';
import store from '@/store/store';
import { mapState } from 'vuex';
export default Vue.extend({
  data: function() {
    return {
      Zones: [] as ZoneInfo[],
      name: '',
      description: '',
      isBusy: false,
      errorMessage: '',
      hasFailed: false,
      locationId: 0
    };
  },

  computed: {
    ...mapState({
      zones: 'SelectedZones'
    })
  },

  async mounted() {
    this.locationId = Number.parseInt(this.$route.params['id']);
    await store.dispatch('FETCH_LOCATION', this.locationId);
  },

  methods: {
    save: async function() {}
  }
});
</script>

<style scoped>
#parent {
  text-align: center;
  padding: 10%;
}
#test {
  text-align: right;
}
</style>
