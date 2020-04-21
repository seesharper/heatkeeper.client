import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Zones from "./components/Zones.vue";
import Login from "./views/Login.vue";
import Users from "./views/Users.vue";
import Register from "./views/Register.vue";
import RegisterLocation from "./views/RegisterLocation.vue";
import ManageLocations from "./views/ManageLocations.vue";
import ManageZones from "./views/ManageZones.vue";
import RegisterUser from "./views/RegisterUser.vue";
import RegisterZone from "./views/RegisterZone.vue";
import EditLocation from "./views/EditLocation.vue";
import EditZone from "./views/EditZone.vue";
import EditUser from "./views/EditUser.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/zones/:location",
      name: "zones",
      component: Zones,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/users",
      name: "users",
      component: Users,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/register-user",
      name: "register-user",
      component: RegisterUser,
    },
    {
      path: "/edit-user/:id",
      name: "edit-user",
      component: EditUser,
    },
    {
      path: "/edit-location/:id",
      name: "edit-location",
      component: EditLocation,
    },
    {
      path: "/edit-zone/:id",
      name: "edit-zone",
      component: EditZone,
    },
    {
      path: "/edit-location/:id/register-zone",
      name: "register-zone",
      component: RegisterZone,
    },
    {
      path: "/manageLocations",
      name: "manageLocations",
      component: ManageLocations,
    },
    {
      path: "/register-location",
      name: "register-location",
      component: RegisterLocation,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});
