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
    locations.push({name:'Home', description:'This is home'});
    locations.push({name:'Cabin', description:'This is my cabin'});
    return locations;
    //return api<Location[]>("api/locations");
}




export interface Location {
  name: string;
  description: string;
}
