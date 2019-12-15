import { EnvironmentHelper } from './../EnvironmentHelper';
import {
  LoginRequest,
  User,
  Location,
  UserInfo,
  NewUser
} from './../models/models';

import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import store from '@/store/store';

export async function login(loginRequest: LoginRequest): Promise<User> {
  const baseUrl = EnvironmentHelper.baseUrl;
  const result = await axios.post(
    `${baseUrl}api/users/authenticate`,
    loginRequest
  );
  return result.data as User;
}

export async function getLocations(): Promise<Location[]> {
  const config: AxiosRequestConfig = {
    headers: { Authorization: 'bearer ' + store.state.User.token }
  };

  const baseUrl = EnvironmentHelper.baseUrl;
  const result = await axios.get(`${baseUrl}api/locations`, config);
  return result.data as Location[];
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
