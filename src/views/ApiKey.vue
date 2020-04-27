<template>
    <div id="parent">
        <b-form id="registerLocationForm" @submit.prevent="onSubmit" autocomplete="off">
            <p>Generates an API key to be used for reporting measurements</p>
            <b-form-group>
                <b-button block v-on:click="generate" variant="primary">Generate APIKEY</b-button>
            </b-form-group>
            <b-form-group>
                <b-form-textarea rows="12" ref="apikey" plaintext :value="value"></b-form-textarea>
            </b-form-group>
            <b-form-group>
                <b-button
                    block
                    v-on:click="copy"
                    v-if="value.length > 0"
                    variant="primary"
                >Copy to clipboard</b-button>
            </b-form-group>
        </b-form>
    </div>
</template>


<script lang="ts">
import Vue from "vue";
import { getApiKey } from "../api/api";
export default Vue.extend({
    data: function() {
        return {
            value: ""
        };
    },

    methods: {
        generate: async function() {
            this.value = (await getApiKey()).token;
        },
        copy: async function() {
            (this.$refs.apikey as any).select();
            document.execCommand("copy");
        }
    }
});
</script>