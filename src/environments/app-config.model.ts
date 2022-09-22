import {enableProdMode, InjectionToken} from '@angular/core';

/**
 * The URL to the app config document.
 */
export const APP_CONFIG_ENDPOINT = 'app-config.json';

/**
 * The kind of stages.
 */
export type Stage = 'local' | 'dev' | 'prod';

/**
 * The environment of the app.
 */
export interface AppConfig {
    /**
     * The stage flag indicating on which environment we run.
     */
    stage: Stage;
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
/**
 * The injection token to get the stage.
 */
export const APP_STAGE = new InjectionToken<Stage>('app.stage');

/**
 * Initialize the app with the current config. At least, it enables prod mode.
 * @param config the app config
 */
export function initializeApp(config: AppConfig): void {
  if(config.stage === 'prod') {
    enableProdMode();
  }
}
