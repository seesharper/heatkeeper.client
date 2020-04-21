import {
  login,
  getLocations,
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  createLocation,
  updateLocation,
  getZones,
  getLocationUsers,
  createZone,
  getSensors,
  getZoneDetails,
  updateZone,
  deleteZone,
} from "@/api/api";
import {
  User,
  LoginRequest,
  LocationInfo,
  DefaultUser,
  UserInfo,
  NewUser,
  ZoneInfo,
  SensorInfo,
  DefaultLocation,
  DefaultZone,
  ZoneDetails,
} from "./../models/models";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    IsBusy: false as boolean,
    User: DefaultUser as User,
    Locations: [] as LocationInfo[],
    SelectedZones: [] as ZoneInfo[],
    SelectedUsers: [] as UserInfo[],
    SelectedLocation: {} as LocationInfo,
    SelectedZone: {} as ZoneDetails,
    SelectedSensors: [] as SensorInfo[],
    Users: [] as UserInfo[],
    HasFailed: false,
    ErrorMessage: "",
  },
  mutations: {
    SET_CURRENT_USER(state, user: User) {
      state.User = user;
      localStorage.setItem("user", JSON.stringify(user));
    },

    ADD_USER(state, user: UserInfo) {
      state.Users.push(user);
    },

    SET_BUSY_STATUS(state, isBusy: boolean) {
      state.IsBusy = isBusy;
    },

    SET_LOCATIONS(state, locations: LocationInfo[]) {
      state.Locations = locations;
    },

    ADD_LOCATION(state, location: LocationInfo) {
      state.Locations.push(location);
    },
    SET_LOCATION(state, location: LocationInfo) {
      const userIndex = state.Locations.indexOf(location);
      state.Locations[userIndex] = location;
    },

    SET_SELECTED_ZONES(state, zones: ZoneInfo[]) {
      state.SelectedZones = zones;
    },

    SET_SELECTED_SENSORS(state, sensors: SensorInfo[]) {
      state.SelectedSensors = sensors;
    },

    SET_SELECTED_ZONE(state, selectedZone: ZoneDetails) {
      state.SelectedZone = selectedZone;
    },

    ADD_ZONE_TO_SELECTED_ZONE(state, zone: ZoneInfo) {
      state.SelectedZones.push(zone);
    },

    SET_SELECTED_USERS(state, users: UserInfo[]) {
      state.SelectedUsers = users;
    },

    SET_SELECTED_LOCATION(state, locationId: number) {
      state.SelectedLocation =
        state.Locations.find((l) => l.id === locationId) ?? DefaultLocation;
    },

    SET_USERS(state, users: UserInfo[]) {
      state.Users = users;
    },
    SET_USER(state, user: UserInfo) {
      const userIndex = state.Users.indexOf(user);
      state.Users[userIndex] = user;
    },
    REMOVE_USER(state, userId: number) {
      state.Users = state.Users.filter((u) => u.id !== userId);
    },

    INITIALIZE(state) {
      const json = localStorage.getItem("user");
      if (json != null) {
        state.User = JSON.parse(json) as User;
      }
    },
    SET_ERROR(state, message: string) {
      state.ErrorMessage = message;
      state.HasFailed = true;
    },

    CLEAR_ERROR(state) {
      state.ErrorMessage = "";
      state.HasFailed = false;
    },
  },
  actions: {
    async LOGIN(state, loginRequest: LoginRequest) {
      const user = await login(loginRequest);
      state.commit("SET_CURRENT_USER", user);
    },

    async CREATE_LOCATION(state, location: LocationInfo) {
      const userId = await createLocation(location);
      location.id = userId;
      state.commit("ADD_LOCATION", location);
    },

    async UPDATE_LOCATION(state, location: LocationInfo) {
      await updateLocation(location);
      state.commit("SET_LOCATION", location);
    },
    async FETCH_LOCATIONS(state) {
      const locations = await getLocations();
      state.commit("SET_LOCATIONS", locations);
    },

    async FETCH_SELECTED_LOCATION(state, locationId: number) {
      state.commit("SET_SELECTED_LOCATION", locationId);
      const zones = await getZones(locationId);
      state.commit("SET_SELECTED_ZONES", zones);
      const users = await getLocationUsers(locationId);
      state.commit("SET_SELECTED_USERS", users);
    },

    async FETCH_SELECTED_ZONE(context, zoneId: number) {
      const zoneDetails = await getZoneDetails(zoneId);
      context.commit("SET_SELECTED_ZONE", zoneDetails);
      const sensors = await getSensors();
      context.commit("SET_SELECTED_SENSORS", sensors);
    },

    async FETCH_USERS(state) {
      const users = await getUsers();
      state.commit("SET_USERS", users);
    },

    async CREATE_USER(state, user: NewUser) {
      const userId = await createUser(user);
      user.id = userId;
      state.commit("ADD_USER", user);
    },

    async UPDATE_USER(state, user: User) {
      await updateUser(user);
      state.commit("SET_USER", user);
    },

    async DELETE_USER(state, userId: number) {
      await deleteUser(userId);
      state.commit("REMOVE_USER", userId);
    },

    async CREATE_ZONE(state, zone: ZoneInfo) {
      await createZone(zone);
      state.commit("ADD_ZONE_TO_SELECTED_ZONE", zone);
    },

    async UPDATE_ZONE(context, zoneDetails: ZoneDetails) {
      await updateZone(zoneDetails);
      context.commit("SET_SELECTED_ZONE", zoneDetails);
    },

    async DELETE_ZONE(context, zoneID: number) {
      await deleteZone(zoneID);
    },
  },
  modules: {},
});
