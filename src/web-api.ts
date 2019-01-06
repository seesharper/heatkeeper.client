
import { Location } from './web-api';
function api<T>(url: string): Promise<T> {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json().then(data => data as T);
  });
}

export async function getLocations() : Promise<Location[]>{
    var locations = new Array<Location>();
    locations.push({name:'Home', description:'This is home', temperature:2.3, humidity:42, imageUrl:require('@/assets/download.jpeg')});
    locations.push({name:'Cabin', description:'This is my cabin', temperature:-2.4, humidity:47, imageUrl:require('@/assets/snow.jpg')});
    return locations;
}

export async function getZones(location : string) : Promise<ZoneInfo[]>{
  var zones = new Array<ZoneInfo>();
  zones.push({name:'Living Room', temperature:22.6, humidity:38, batteryLevel:68});
  zones.push({name:'Master Bedroom', temperature:10.2, humidity:36, batteryLevel:72});
  return zones;
}

export interface Location {
  name: string;
  description: string;
  temperature: number;
  humidity: number;
  imageUrl:string;
}

export interface ZoneInfo{
  name: string;
  temperature: number;
  humidity: number;
  batteryLevel : number;
}
