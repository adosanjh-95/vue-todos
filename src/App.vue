<template>
  <div id="app">
    <Header />
    <main class="main">
      <Body />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "@/components/header/index.vue";
import Body from "@/components/body/index.vue";

export default Vue.extend({
  name: "App",
  components: {
    Header,
    Body,
  },
});
</script>

<style lang="scss">
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  margin: 0 auto;
  box-sizing: border-box;
}

body {
  margin: 0;
}

main {
  display: flex;
  justify-content: center;
  height: 100%;
  max-width: 1400px;
  margin: 0 auto;
}
</style>
