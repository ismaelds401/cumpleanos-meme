import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';

import { GameService } from '../../services/game.service';

type WindowWithWebAudio = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

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

  isUnlocked(pointId: number): boolean {
    return this.game.state().completedTreasurePointIds.includes(pointId);
  }

  chooseAnswer(answerId: string): void {
    const hadAllKeys = this.game.hasAllTreasureKeys();

    this.game.submitTreasureAnswer(answerId);

    if (!hadAllKeys && this.game.hasAllTreasureKeys()) {
      this.playVictoryMusic();
    }
  }

  finishLevel(): void {
    this.playVictoryMusic();
    this.game.finishTreasureLevel();
  }

  private playVictoryMusic(): void {
    const audioWindow = window as WindowWithWebAudio;
    const AudioContextClass = audioWindow.AudioContext ?? audioWindow.webkitAudioContext;

    if (!AudioContextClass) {
      return;
    }

    const context = new AudioContextClass();
    const notes = [523.25, 659.25, 783.99, 1046.5, 783.99, 987.77, 1174.66, 1318.51];
    const startTime = context.currentTime + 0.03;

    notes.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const noteStart = startTime + index * 0.18;

      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(frequency, noteStart);
      gain.gain.setValueAtTime(0.0001, noteStart);
      gain.gain.exponentialRampToValueAtTime(0.18, noteStart + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.16);

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(noteStart);
      oscillator.stop(noteStart + 0.18);
    });

    window.setTimeout(() => void context.close(), 1900);
  }
}
