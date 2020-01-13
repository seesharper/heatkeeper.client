import { EnvironmentHelper } from './../EnvironmentHelper';
import {
  LoginRequest,
  User,
  LocationInfo,
  UserInfo,
  NewUser,
  Zone,
  NewZone
} from './../models/models';

import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import store from '@/store/store';

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => console.log(error)
);

export async function login(loginRequest: LoginRequest): Promise<User> {
  const baseUrl = EnvironmentHelper.baseUrl;
  const result = await axios.post(
    `${baseUrl}api/users/authenticate`,
    loginRequest
  );
  return result.data as User;
}

export async function getLocations(): Promise<LocationInfo[]> {
  const config: AxiosRequestConfig = {
    headers: { Authorization: 'bearer ' + store.state.User.token }
  };

  const baseUrl = EnvironmentHelper.baseUrl;
  const result = await axios.get(`${baseUrl}api/locations`, config);
  return result.data as LocationInfo[];
}

export async function createLocation(location: LocationInfo): Promise<number> {
  const config: AxiosRequestConfig = {
    headers: { Authorization: 'bearer ' + store.state.User.token }
  };
  const baseUrl = EnvironmentHelper.baseUrl;
  const result = await axios.post(`${baseUrl}api/locations`, location, config);
  return result.data.Id;
}

export async function updateLocation(location: LocationInfo) {
  const config: AxiosRequestConfig = {
    headers: { Authorization: 'bearer ' + store.state.User.token }
  };
  const baseUrl = EnvironmentHelper.baseUrl;
  const result = await axios.patch(
    `${baseUrl}api/locations/${location.id}`,
    location,
    config
  );
}

export async function getZones(locationId: number): Promise<Zone[]> {
  const config: AxiosRequestConfig = {
    headers: { Authorization: 'bearer ' + store.state.User.token }
  };
  const baseUrl = EnvironmentHelper.baseUrl;
  const result = await axios.get(
    `${baseUrl}api/locations/${locationId}/zones`,
    config
  );
  return result.data as Zone[];
}

export async function createZone(zone: NewZone): Promise<number> {
  const config: AxiosRequestConfig = {
    headers: { Authorization: 'bearer ' + store.state.User.token }
  };

  const baseUrl = EnvironmentHelper.baseUrl;
  const result = await axios.post(
    `${baseUrl}api/locations/${zone.locationId}/zones`,
    zone,
    config
  );
  return result.data.Id;
}

export async function getUsers(): Promise<UserInfo[]> {
  const config: AxiosRequestConfig = {
    headers: { Authorization: 'bearer ' + store.state.User.token }
  };

  const baseUrl = EnvironmentHelper.baseUrl;
  const result = await axios.get(`${baseUrl}api/users`, config);
  return result.data as UserInfo[];
}

export async function createUser(user: NewUser): Promise<number> {
  const config: AxiosRequestConfig = {
    headers: { Authorization: 'bearer ' + store.state.User.token }
  };
  const baseUrl = EnvironmentHelper.baseUrl;
  const result = await axios.post(`${baseUrl}api/users`, user, config);
  return result.data.Id;
}

export async function updateUser(user: User): Promise<void> {
  const config: AxiosRequestConfig = {
    headers: { Authorization: 'bearer ' + store.state.User.token }
  };
  const baseUrl = EnvironmentHelper.baseUrl;
  await axios.patch(`${baseUrl}api/users/${user.id}`, user, config);
}

export async function deleteUser(userId: number): Promise<void> {
  const config: AxiosRequestConfig = {
    headers: { Authorization: 'bearer ' + store.state.User.token }
  };
  const baseUrl = EnvironmentHelper.baseUrl;
  await axios.delete(`${baseUrl}api/users/${userId}`, config);
}
