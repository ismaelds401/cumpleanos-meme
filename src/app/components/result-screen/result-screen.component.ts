import { Component, inject } from '@angular/core';

import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-result-screen',
  standalone: true,
  templateUrl: './result-screen.component.html',
  styleUrl: './result-screen.component.css'
})
export class ResultScreenComponent {
  readonly game = inject(GameService);
}
