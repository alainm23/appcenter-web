import { Component, inject, OnInit } from '@angular/core';
import { AppDataService } from './core/services/app-data.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
})
export class AppComponent implements OnInit {
  private _appDataService: AppDataService = inject(AppDataService);

  ngOnInit(): void {
    this._appDataService.getAppsData();
  }
}
