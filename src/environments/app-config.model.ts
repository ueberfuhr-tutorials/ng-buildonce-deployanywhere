import {InjectionToken} from '@angular/core';

/**
 * The environment of the app.
 */
export interface AppConfig {
    /**
     * The flag indicating whether we run in production mode or not.
     */
    production: boolean;
    /**
     * The URL to the backend.
     */
    apiEndpoint: string;
}

/**
 * The injection token to get the app config.
 */
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
/**
 * The injection token to get the api endpoint.
 */
export const API_ENDPOINT = new InjectionToken<string>('api.endpoint');
