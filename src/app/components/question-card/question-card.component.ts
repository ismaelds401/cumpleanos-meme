import { Component, inject } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';

import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.css'
})
export class QuestionCardComponent {
  readonly game = inject(GameService);

  optionClass(option: string): Record<string, boolean> {
    const state = this.game.state();
    const question = this.game.currentQuestion();

    return {
      'option--selected': state.selectedAnswer === option,
      'option--correct': state.answerStatus === 'correct' && option === question.correctAnswer,
      'option--wrong': state.answerStatus === 'incorrect' && state.selectedAnswer === option
    };
  }
}
