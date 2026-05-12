import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';

import { GameService } from '../../services/game.service';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-treasure-path',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './treasure-path.component.html',
  styleUrl: './treasure-path.component.css'
})
export class TreasurePathComponent {
  readonly game = inject(GameService);
  readonly keySlots = Array.from({ length: this.game.config.treasurePath.length }, (_, index) => index + 1);
  private readonly sound = inject(SoundService);

  isUnlocked(pointId: number): boolean {
    return this.game.state().completedTreasurePointIds.includes(pointId);
  }

  chooseAnswer(answerId: string): void {
    const hadAllKeys = this.game.hasAllTreasureKeys();
    const activePoint = this.game.activeTreasurePoint();
    const isCorrectAnswer = activePoint?.correctAnswer === answerId;

    this.game.submitTreasureAnswer(answerId);

    if (isCorrectAnswer) {
      this.sound.playTreasureCorrect();
    }

    if (!hadAllKeys && this.game.hasAllTreasureKeys()) {
      window.setTimeout(() => this.sound.playTreasureVictory(), 350);
    }
  }

  finishLevel(): void {
    this.sound.playTreasureVictory();
    this.game.finishTreasureLevel();
  }
}
