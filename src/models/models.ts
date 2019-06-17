export interface Location {
    name: string;
    description: string;
    temperature: number;
    humidity: number;
    imageUrl: string;
  }

export interface ZoneInfo {
    name: string;
    temperature: number;
    humidity: number;
    batteryLevel: number;
  }

export interface LoginRequest {
    username: string;
    password: string;
  }

export interface CurrentUser {
    token: string;
    name: string;
    isAdmin: boolean;
    eMail: string;
    id: string;
  }
