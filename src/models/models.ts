import { Zone } from './models';
import { expect } from 'chai';
export interface LocationInfo {
  id: number;
  name: string;
  description: string;
}

export interface ZoneInfo {
  name: string;
  temperature: number;
  humidity: number;
  batteryLevel: number;
}

export interface Zone {
  id: number;
  name: string;
  description: string;
}

export interface NewZone extends Zone {
  locationId: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CurrentUser {
  token: string;
  name: string;
  isAdmin: boolean;
  eMail: string;
  id: string;
}

export interface User {
  token: string;
  name: string;
  isAdmin: boolean;
  eMail: string;
  id: number;
}

export interface UserInfo {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

export interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
}

export interface NewUser extends UserInfo {
  password: string;
  confirmedPassword: string;
}

export enum EditMode {
  New,
  Update
}

export interface ValidationProblemDetails extends ProblemDetails {
  errors: any;
}

export const DefaultUser = {} as User;

export const DefaultNewUser = {} as NewUser;
