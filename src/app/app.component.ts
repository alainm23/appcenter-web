import { Component, inject } from '@angular/core';
import { AppDataService } from './core/services/app-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private appDataService: AppDataService = inject(AppDataService);
  data: any;

  test() {
    this.appDataService.getAppList();
  }
}
