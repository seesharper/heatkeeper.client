export class EnvironmentHelper {
    public static get isDevelopment(): boolean {
        return process.env.NODE_ENV === "development";
    }

    public static get isProduction(): boolean {
        return process.env.NODE_ENV === "production";
    }

    public static get baseUrl(): string {
        if (EnvironmentHelper.isDevelopment) {
            return 'http://localhost:5000/'
        }

        return '/';
    }
}