import {
  login,
  getLocations,
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  createLocation,
  updateLocation
} from '@/api/api';
import {
  User,
  LoginRequest,
  LocationInfo,
  DefaultUser,
  UserInfo,
  ProblemDetails,
  NewUser
} from './../models/models';
import Vue from 'vue';
import Vuex from 'vuex';
import { AxiosError } from 'axios';

Vue.use(Vuex);

export interface HeatKeeperState {
  Locations: LocationInfo[];
}

export default new Vuex.Store({
  state: {
    IsBusy: false as boolean,
    User: DefaultUser as User,
    Locations: [] as LocationInfo[],
    Users: [] as UserInfo[],
    HasFailed: false,
    ErrorMessage: ''
  },
  mutations: {
    SET_CURRENT_USER(state, user: User) {
      state.User = user;
      localStorage.setItem('user', JSON.stringify(user));
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

    SET_USERS(state, users: UserInfo[]) {
      state.Users = users;
    },
    SET_USER(state, user: UserInfo) {
      const userIndex = state.Users.indexOf(user);
      state.Users[userIndex] = user;
    },
    REMOVE_USER(state, userId: number) {
      state.Users = state.Users.filter(u => u.id !== userId);
    },

    INITIALIZE(state) {
      const json = localStorage.getItem('user');
      if (json != null) {
        state.User = JSON.parse(json) as User;
      }
    },
    SET_ERROR(state, message: string) {
      state.ErrorMessage = message;
      state.HasFailed = true;
    },

    CLEAR_ERROR(state) {
      state.ErrorMessage = '';
      state.HasFailed = false;
    }
  },
  actions: {
    async LOGIN(state, loginRequest: LoginRequest) {
      state.commit('SET_BUSY_STATUS', true);
      const user = await login(loginRequest);
      state.commit('SET_CURRENT_USER', user);
      state.commit('SET_BUSY_STATUS', false);
    },
    async CREATE_LOCATION(state, location: LocationInfo) {
      state.commit('SET_BUSY_STATUS', true);
      try {
        state.commit('CLEAR_ERROR');
        const userId = await createLocation(location);
        location.id = userId;
        state.commit('ADD_LOCATION', location);
      } catch (error) {
        if (error) {
          const axiosError = error as AxiosError<ProblemDetails>;
          if (axiosError && axiosError.response) {
            state.commit('SET_ERROR', axiosError.response.data.detail);
          }
        }
      } finally {
        state.commit('SET_BUSY_STATUS', false);
      }
    },
    async UPDATE_LOCATION(state, location: LocationInfo) {
      state.commit('SET_BUSY_STATUS', true);
      try {
        state.commit('CLEAR_ERROR');
        await updateLocation(location);
        state.commit('SET_LOCATION', location);
      } catch (error) {
        const axiosError = error as AxiosError<ProblemDetails>;
        if (axiosError && axiosError.response) {
          state.commit('SET_ERROR', axiosError.response.data.detail);
        }
      } finally {
        state.commit('SET_BUSY_STATUS', false);
      }
    },
    async FETCH_LOCATIONS(state) {
      state.commit('SET_BUSY_STATUS', true);
      const locations = await getLocations();
      state.commit('SET_LOCATIONS', locations);
      state.commit('SET_BUSY_STATUS', false);
    },
    async FETCH_USERS(state) {
      state.commit('SET_BUSY_STATUS', true);
      const users = await getUsers();
      state.commit('SET_USERS', users);
      state.commit('SET_BUSY_STATUS', false);
    },
    async CREATE_USER(state, user: NewUser) {
      state.commit('SET_BUSY_STATUS', true);
      try {
        state.commit('CLEAR_ERROR');
        const userId = await createUser(user);
        user.id = userId;
        state.commit('ADD_USER', user);
      } catch (error) {
        if (error) {
          const axiosError = error as AxiosError<ProblemDetails>;
          if (axiosError && axiosError.response) {
            state.commit('SET_ERROR', axiosError.response.data.detail);
          }
        }
      } finally {
        state.commit('SET_BUSY_STATUS', false);
      }
    },

    async UPDATE_USER(state, user: User) {
      state.commit('SET_BUSY_STATUS', true);
      try {
        state.commit('CLEAR_ERROR');
        await updateUser(user);
        state.commit('SET_USER', user);
      } catch (error) {
        const axiosError = error as AxiosError<ProblemDetails>;
        if (axiosError && axiosError.response) {
          state.commit('SET_ERROR', axiosError.response.data.detail);
        }
      } finally {
        state.commit('SET_BUSY_STATUS', false);
      }
    },

    async DELETE_USER(state, userId: number) {
      state.commit('SET_BUSY_STATUS', true);
      try {
        state.commit('CLEAR_ERROR');
        await deleteUser(userId);
        state.commit('REMOVE_USER', userId);
      } catch (error) {
        const axiosError = error as AxiosError<ProblemDetails>;
        if (axiosError && axiosError.response) {
          state.commit('SET_ERROR', axiosError.response.data.detail);
        }
      } finally {
        state.commit('SET_BUSY_STATUS', false);
      }
    }
  },
  modules: {}
});
