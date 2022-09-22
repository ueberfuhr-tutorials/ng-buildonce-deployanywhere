import {Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {APP_CONFIG_ENDPOINT, AppConfig} from '../../../environments/app-config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private env: AppConfig = {
    apiEndpoint: 'http://localhost',
    stage: 'local'
  };

  constructor(private http: HttpClient) {
  }

  get config(): AppConfig {
    return this.env;
  }

  loadConfig(): Observable<AppConfig> {
    return this.http.get<AppConfig>(APP_CONFIG_ENDPOINT)
      .pipe(
        tap(env => this.env = env)
      );
  }

}
