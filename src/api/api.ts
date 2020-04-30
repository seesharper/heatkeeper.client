import { EnvironmentHelper } from "./../EnvironmentHelper";
import {
  LoginRequest,
  User,
  LocationInfo,
  UserInfo,
  NewUser,
  ZoneInfo,
  NewZone,
  ProblemDetails,
  ZoneDetails,
  ApiKey,
  SensorInfo,
  DashboardLocation,
} from "./../models/models";

import axios, { AxiosRequestConfig, AxiosError } from "axios";
import store from "@/store/store";
import router from "@/router";

axios.interceptors.request.use(
  (config) => {
    store.commit("CLEAR_ERROR");
    store.commit("SET_BUSY_STATUS", true);
    return config;
  },
  (error) => {
    store.commit("SET_BUSY_STATUS", false);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    store.commit("SET_BUSY_STATUS", false);
    return response;
  },
  (error) => {
    store.commit("SET_BUSY_STATUS", false);
    if (error.response.status === 401) {
      router.push("login");
    } else {
      store.commit("SET_BUSY_STATUS", false);
      const axiosError = error as AxiosError<ProblemDetails>;
      if (axiosError && axiosError.response) {
        store.commit("SET_ERROR", axiosError.response.data.detail);
      }
    }
    return Promise.reject(error);
  }
);

export async function login(loginRequest: LoginRequest): Promise<User> {
  const baseUrl = EnvironmentHelper.baseUrl;
  const result = await axios.post(
    `${baseUrl}api/users/authenticate`,
    loginRequest
  );
  return result.data as User;
}

export async function getDashboardLocations(): Promise<DashboardLocation[]> {
  const config: AxiosRequestConfig = {
    headers: { Authorization: "bearer " + store.state.User.token },
  };

  const baseUrl = EnvironmentHelper.baseUrl;

  const result = await axios.get<DashboardLocation[]>(
    `${baseUrl}api/dashboard/locations`,
    config
  );
  return result.data as DashboardLocation[];
}

export async function getLocations(): Promise<LocationInfo[]> {
  const config: AxiosRequestConfig = {
    headers: { Authorization: "bearer " + store.state.User.token },
  };

  const baseUrl = EnvironmentHelper.baseUrl;
  const result = await axios.get<LocationInfo[]>(
    `${baseUrl}api/locations`,
    config
  );
  return result.data as LocationInfo[];
}

export async function getZoneDetails(zoneId: number): Promise<ZoneDetails> {
  const config: AxiosRequestConfig = {
    headers: { Authorization: "bearer " + store.state.User.token },
  };

  const baseUrl = EnvironmentHelper.baseUrl;
  const result = await axios.get<ZoneDetails>(
    `${baseUrl}api/zones/${zoneId}`,
    config
  );

  return result.data as ZoneDetails;
}

export async function updateZone(zoneDetails: ZoneDetails): Promise<void> {
  const config: AxiosRequestConfig = {
    headers: { Authorization: "bearer " + store.state.User.token },
  };

  const baseUrl = EnvironmentHelper.baseUrl;

  await axios.patch(
    `${baseUrl}api/zones/${zoneDetails.id}`,
    zoneDetails,
    config
  );
}

export async function deleteZone(zoneId: number): Promise<void> {
  const config: AxiosRequestConfig = {
    headers: { Authorization: "bearer " + store.state.User.token },
  };

  const baseUrl = EnvironmentHelper.baseUrl;

  await axios.delete(`${baseUrl}api/zones/${zoneId}`, config);
}

export async function createLocation(location: LocationInfo): Promise<number> {
  const config: AxiosRequestConfig = {
    headers: { Authorization: "bearer " + store.state.User.token },
  };
  const baseUrl = EnvironmentHelper.baseUrl;
  const result = await axios.post(`${baseUrl}api/locations`, location, config);
  return result.data.Id;
}

export async function updateLocation(location: LocationInfo) {
  const config: AxiosRequestConfig = {
    headers: { Authorization: "bearer " + store.state.User.token },
  };
  const baseUrl = EnvironmentHelper.baseUrl;
  const result = await axios.patch(
    `${baseUrl}api/locations/${location.id}`,
    location,
    config
  );
}

export async function getZones(locationId: number): Promise<ZoneInfo[]> {
  const config: AxiosRequestConfig = {
    headers: { Authorization: "bearer " + store.state.User.token },
  };
  const baseUrl = EnvironmentHelper.baseUrl;
  const result = await axios.get(
    `${baseUrl}api/locations/${locationId}/zones`,
    config
  );
  return result.data as ZoneInfo[];
}

export async function getSensors(): Promise<ZoneInfo[]> {
  const config: AxiosRequestConfig = {
    headers: { Authorization: "bearer " + store.state.User.token },
  };
  const baseUrl = EnvironmentHelper.baseUrl;
  const result = await axios.get(
    `${baseUrl}api/zones/${store.state.SelectedZone.id}/sensors`,
    config
  );
  return result.data as ZoneInfo[];
}

export async function getLocationUsers(
  locationId: number
): Promise<UserInfo[]> {
  const config: AxiosRequestConfig = {
    headers: { Authorization: "bearer " + store.state.User.token },
  };
  const baseUrl = EnvironmentHelper.baseUrl;
  const result = await axios.get(
    `${baseUrl}api/locations/${locationId}/users`,
    config
  );
  return result.data as UserInfo[];
}

export async function createZone(zone: ZoneInfo): Promise<number> {
  const config: AxiosRequestConfig = {
    headers: { Authorization: "bearer " + store.state.User.token },
  };

  const baseUrl = EnvironmentHelper.baseUrl;
  const result = await axios.post(
    `${baseUrl}api/locations/${store.state.SelectedLocation.id}/zones`,
    zone,
    config
  );
  return result.data.Id;
}

export async function getUsers(): Promise<UserInfo[]> {
  const config: AxiosRequestConfig = {
    headers: { Authorization: "bearer " + store.state.User.token },
  };

  const baseUrl = EnvironmentHelper.baseUrl;
  const result = await axios.get(`${baseUrl}api/users`, config);
  return result.data as UserInfo[];
}

export async function createUser(user: NewUser): Promise<number> {
  const config: AxiosRequestConfig = {
    headers: { Authorization: "bearer " + store.state.User.token },
  };
  const baseUrl = EnvironmentHelper.baseUrl;
  const result = await axios.post(`${baseUrl}api/users`, user, config);
  return result.data.Id;
}

export async function updateUser(user: User): Promise<void> {
  const config: AxiosRequestConfig = {
    headers: { Authorization: "bearer " + store.state.User.token },
  };
  const baseUrl = EnvironmentHelper.baseUrl;
  await axios.patch(`${baseUrl}api/users/${user.id}`, user, config);
}

export async function deleteUser(userId: number): Promise<void> {
  const config: AxiosRequestConfig = {
    headers: { Authorization: "bearer " + store.state.User.token },
  };
  const baseUrl = EnvironmentHelper.baseUrl;
  await axios.delete(`${baseUrl}api/users/${userId}`, config);
}

export async function updateSensor(sensor: SensorInfo): Promise<void> {
  const config: AxiosRequestConfig = {
    headers: { Authorization: "bearer " + store.state.User.token },
  };
  const baseUrl = EnvironmentHelper.baseUrl;
  await axios.patch(`${baseUrl}api/sensors/${sensor.id}`, sensor, config);
}

export async function deleteSensor(sensorId: number): Promise<void> {
  const config: AxiosRequestConfig = {
    headers: { Authorization: "bearer " + store.state.User.token },
  };
  const baseUrl = EnvironmentHelper.baseUrl;
  await axios.delete(`${baseUrl}api/sensor/${sensorId}`, config);
}

export async function getApiKey(): Promise<ApiKey> {
  const config: AxiosRequestConfig = {
    headers: { Authorization: "bearer " + store.state.User.token },
  };
  const baseUrl = EnvironmentHelper.baseUrl;
  const result = await axios.get<ApiKey>(`${baseUrl}api/users/apikey`, config);
  return result.data;
}
