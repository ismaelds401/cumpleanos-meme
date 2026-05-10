import { Component, inject } from '@angular/core';

import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { PuzzleBoardComponent } from '../puzzle-board/puzzle-board.component';
import { QuestionCardComponent } from '../question-card/question-card.component';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [ProgressBarComponent, PuzzleBoardComponent, QuestionCardComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css'
})
export class GameBoardComponent {
  readonly game = inject(GameService);
}
