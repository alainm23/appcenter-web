import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppDataService {
  private apiUrl = '/api/apps';

  private _httpClient: HttpClient = inject(HttpClient);

  getAppList() {
    return new Promise((resolve, reject) => {
      this._httpClient.get<any>(this.apiUrl).subscribe({
        next: (json) => {
          console.log('json', json);
          resolve(json);
        },
      });
    });
  }
}
