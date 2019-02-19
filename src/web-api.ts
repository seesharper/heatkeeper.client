
import {Location, ZoneInfo} from './models/models';
import {EnvironmentHelper} from './EnvironmentHelper'


async function api<T>(url: string): Promise<T> {
  const baseUrl = EnvironmentHelper.baseUrl;

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data as T;
}

export async function getLocations() : Promise<Location[]>{
    var locations = new Array<Location>();
    locations.push({name:'Homes', description:'This is home', temperature:2.3, humidity:42, imageUrl:require('@/assets/download.jpeg')});
    locations.push({name:'Cabin', description:'This is my cabin', temperature:-2.4, humidity:47, imageUrl:require('@/assets/snow.jpg')});
    return locations;
}

export async function getZones(location : string) : Promise<ZoneInfo[]>{
  var zones = new Array<ZoneInfo>();
  zones.push({name:'Living Room', temperature:22.6, humidity:38, batteryLevel:68});
  zones.push({name:'Master Bedroom', temperature:10.2, humidity:36, batteryLevel:72});
  zones.push({name:'Bathroom 1st floor', temperature:10.2, humidity:36, batteryLevel:72});
  zones.push({name:'Bathroom 2nd floor', temperature:12.2, humidity:36, batteryLevel:72});
  zones.push({name:'Hallway', temperature:12.2, humidity:36, batteryLevel:72});
  return zones;
}


