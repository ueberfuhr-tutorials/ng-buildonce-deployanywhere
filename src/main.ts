import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {API_ENDPOINT, APP_CONFIG, AppConfig} from "./environments/app-config.model";

fetch('app-config.json', {cache: 'reload'}) // no caching!
  .then(response => response.json() as unknown as AppConfig)
  .catch(error => {
    // log error to console
    console.error(error);
    // use default values in case of error
    return {
      production: true,
      apiEndpoint: './api/v1'
    } as AppConfig;
  })
  .then(config => {
    if (config.production) {
      enableProdMode();
    }
    return platformBrowserDynamic([
      {provide: APP_CONFIG, useValue: config},
      {provide: API_ENDPOINT, useValue: config.apiEndpoint}
    ]).bootstrapModule(AppModule);
  })
  .catch(err => console.error(err));
