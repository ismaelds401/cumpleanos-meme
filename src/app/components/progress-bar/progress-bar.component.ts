import { Component, inject } from '@angular/core';

import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent {
  readonly game = inject(GameService);
}
