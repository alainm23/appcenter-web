import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-app-card',
  standalone: true,
  imports: [],
  templateUrl: './app-card.component.html',
  styleUrl: './app-card.component.scss',
})
export class AppCardComponent {
  @Input() app: any;
}
