import {Component, Inject} from '@angular/core';
import {APP_CONFIG, AppConfig} from "../environments/app-config.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(@Inject(APP_CONFIG) public readonly config: AppConfig) {
  }

}
