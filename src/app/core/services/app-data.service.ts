import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppDataService {
  private http: HttpClient = inject(HttpClient);

  private readonly jsonUrl = 'appstream.json';
  private _apps = new BehaviorSubject([]);

  getAppsData() {
    this.http.get<any[]>(this.jsonUrl).subscribe({
      next: (apps: any) => {
        console.log(apps);
        this.setApps(apps);
      },
    });
  }

  setApps(value: any) {
    this._apps.next(value);
  }

  get apps() {
    return this._apps.asObservable();
  }
}
