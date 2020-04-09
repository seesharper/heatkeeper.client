import { LocationInfo, ZoneDetail } from "./models/models";
import { EnvironmentHelper } from "./EnvironmentHelper";
import { HttpClient } from "@/HttpClient";

async function api<T>(url: string): Promise<T> {
  const baseUrl = EnvironmentHelper.baseUrl;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data as T;
}

export async function getZones(location: string): Promise<ZoneDetail[]> {
  const zones = new Array<ZoneDetail>();
  zones.push({
    id: 1,
    description: "",
    name: "Living Room",
    temperature: 22.6,
    humidity: 38,
    batteryLevel: 68,
  });
  zones.push({
    id: 2,
    description: "",
    name: "Master Bedroom",
    temperature: 10.2,
    humidity: 36,
    batteryLevel: 72,
  });
  zones.push({
    id: 3,
    description: "",
    name: "Bathroom 1st floor",
    temperature: 10.2,
    humidity: 36,
    batteryLevel: 72,
  });
  zones.push({
    id: 4,
    description: "",
    name: "Bathroom 2nd floor",
    temperature: 12.2,
    humidity: 36,
    batteryLevel: 72,
  });
  zones.push({
    id: 5,
    description: "",
    name: "Hallway",
    temperature: 12.2,
    humidity: 36,
    batteryLevel: 72,
  });
  return zones;
}
