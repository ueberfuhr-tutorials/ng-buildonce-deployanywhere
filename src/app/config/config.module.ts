import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ConfigService} from './services/config.service';
import {Observable, tap} from 'rxjs';
import {API_ENDPOINT, APP_CONFIG, APP_STAGE, AppConfig, initializeApp} from '../../environments/app-config.model';

function loadConfig(config: ConfigService): () => Observable<AppConfig> {
  return () => config.loadConfig().pipe(tap(config => initializeApp(config)));
}

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [ConfigService],
      multi: true
    },
    {
      provide: API_ENDPOINT,
      useFactory: (configService: ConfigService) => configService.config.apiEndpoint,
      deps: [ConfigService],
    },
    {
      provide: APP_STAGE,
      useFactory: (configService: ConfigService) => configService.config.stage,
      deps: [ConfigService],
    },
    {
      provide: APP_CONFIG,
      useFactory: (configService: ConfigService) => configService.config,
      deps: [ConfigService],
    }
  ]
})
export class ConfigModule {
}
