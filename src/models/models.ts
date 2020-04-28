export interface LocationInfo {
  id: number;
  name: string;
  description: string;
}

export interface ZoneDetails {
  id: number;
  description: string;
  name: string;
  isDefaultOutsideZone: boolean;
  isDefaultInsideZone: boolean;
}

export interface ZoneInfo {
  id: number;
  name: string;
  description: string;
}

export interface SensorInfo {
  id: number;
  externalId: string;
  name: string;
  description: string;
  zoneId: number | null;
}

export interface NewZone extends ZoneInfo {
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

export interface ApiKey {
  token: string;
}

export enum EditMode {
  New,
  Update,
}

export interface ValidationProblemDetails extends ProblemDetails {
  errors: any;
}

export const DefaultUser = {} as User;

export const DefaultNewUser = {} as NewUser;

export const DefaultLocation = {} as LocationInfo;

export const DefaultZone = {} as ZoneInfo;

export const DefaultSensor = {} as SensorInfo;
