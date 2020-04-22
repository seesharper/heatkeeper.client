<template>
  <div id="app">
    <div id="nav">
      <NavigationBar></NavigationBar>
    </div>
    <div id="parent">
      <b-overlay :show="isBusy">
        <router-view />
      </b-overlay>
      <b-alert variant="danger" :show="hasFailed">{{ errorMessage }}</b-alert>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-property-decorator";
import NavigationBar from "@/components/NavigationBar.vue";
import store from "./store/store";

export default Vue.extend({
  name: "app",
  components: {
    NavigationBar: NavigationBar,
  },
  computed: {
    hasFailed(): boolean {
      return store.state.HasFailed;
    },
    errorMessage(): string {
      return store.state.ErrorMessage;
    },
    isBusy(): boolean {
      return store.state.IsBusy;
    },
  },
});
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}

#parent {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
