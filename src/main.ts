import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStream,
  faPlusCircle,
  faEdit,
  faTrash,
  faUndo,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.config.productionTip = false;

library.add(faStream);
library.add(faPlusCircle);
library.add(faEdit);
library.add(faTrash);
library.add(faUndo);
library.add(faCheckCircle);

Vue.component("font-awesome-icon", FontAwesomeIcon);

// update the local storage store whenever a change is made to the store
store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});

new Vue({
  store,
  render: (h) => h(App),
  beforeCreate() {
    this.$store.commit("initialiseStore");
  },
}).$mount("#app");
