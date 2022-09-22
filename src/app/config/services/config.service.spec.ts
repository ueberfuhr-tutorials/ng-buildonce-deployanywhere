import {fakeAsync} from '@angular/core/testing';

import {ConfigService} from './config.service';
import {createHttpFactory, HttpMethod, SpectatorHttp} from '@ngneat/spectator';
import {HttpTestingController} from '@angular/common/http/testing';
import {APP_CONFIG_ENDPOINT, AppConfig} from '../../../environments/app-config.model';

describe('ConfigService', () => {
  let spectator: SpectatorHttp<ConfigService>;
  const createService = createHttpFactory(ConfigService);
  let service: ConfigService;
  let http: HttpTestingController;

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
    http = spectator.controller;
  });

  it('should be initialized correctly', () => {
    expect(service.config.stage).toEqual('local');
    expect(service.config.apiEndpoint).toBeTruthy();
  });

  it('should read config correctly', fakeAsync(() => {
    const config: AppConfig = {
      stage: 'prod',
      apiEndpoint: 'my-endpoint'
    }
    service.loadConfig().subscribe(result => {
      expect(result).toEqual(config);
      expect(service.config).toEqual(config);
    });
    http.expectOne(APP_CONFIG_ENDPOINT, HttpMethod.GET)
      .flush(config);
  }));
});
