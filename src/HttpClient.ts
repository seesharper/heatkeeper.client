import { CurrentUser } from './models/models';
export class HttpClient {

    public static async post<T>(url: string, request: T): Promise<Response> {
        const json = JSON.stringify(request);
        const requestHeaders = new Headers();
        requestHeaders.append('Content-Type', 'application/json');
        const fullUrl = this.getBaseUrl() + url;
        return await fetch(fullUrl, {method: 'POST', headers: requestHeaders, body: json});
    }

    public static async get<T>(url: string) : Promise<T>{
        const fullUrl = this.getBaseUrl() + url;
        const requestHeaders = new Headers();
        const currentUser = this.getCurrentUser();
        requestHeaders.append("Authorization", 'Bearer ' + currentUser.token);
        const response = await fetch(fullUrl, {method:'GET', headers: requestHeaders});
        const data = await response.json();
        return data as T;
    }

    private static getBaseUrl(): string {
        if (process.env.NODE_ENV === 'development'){
            return 'http://localhost:5000/';
        }
        return '/';
    }

    private static getCurrentUser(): CurrentUser {

        const json = localStorage.getItem('loggedInUser');
        if (json != null) {
            return JSON.parse(json) as CurrentUser;
        }
        throw Error('User is not logged in');
    }
}