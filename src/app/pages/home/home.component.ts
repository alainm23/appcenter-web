import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { AppDataService } from '../../core/services/app-data.service';
import { CommonModule } from '@angular/common';
import { AppCardComponent } from '../../shared/components/app-card/app-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AppCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private _appDataService: AppDataService = inject(AppDataService);

  apps: any = signal([]);

  ngOnInit(): void {
    this._appDataService.apps.subscribe({
      next: (apps: any[]) => {
        this.apps.set(apps);
      },
    });
  }
}
