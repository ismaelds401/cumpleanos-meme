import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';

import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-heart-flight-level',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './heart-flight-level.component.html',
  styleUrl: './heart-flight-level.component.css'
})
export class HeartFlightLevelComponent implements OnDestroy {
  readonly game = inject(GameService);
  readonly stars = Array.from({ length: 150 }, (_, index) => index + 1);

  @ViewChild('letterAudio') private letterAudio?: ElementRef<HTMLAudioElement>;

  private failTimer: ReturnType<typeof window.setTimeout> | null = null;
  private bottleTimer: ReturnType<typeof window.setTimeout> | null = null;
  private videoTimer: ReturnType<typeof window.setTimeout> | null = null;

  ngOnDestroy(): void {
    this.letterAudio?.nativeElement.pause();
    this.clearTimers();
  }

  pumpHeart(): void {
    const statusBeforeClick = this.game.state().heartFlightStatus;

    if (statusBeforeClick === 'failed' || statusBeforeClick === 'idle') {
      this.clearTimers();
    }

    this.game.pumpHeartFlight();

    const status = this.game.state().heartFlightStatus;

    if (status === 'inflating') {
      this.scheduleFailure();
    }

    if (status === 'flying') {
      this.clearFailTimer();
      this.bottleTimer = window.setTimeout(() => this.game.revealLoveBottle(), 2600);
    }
  }

  collectBottle(): void {
    this.clearVideoTimer();
    this.game.collectLoveBottle();
    this.videoTimer = window.setTimeout(() => this.game.playBirthdayVideo(), 2100);
  }

  finishVideo(): void {
    this.game.showFinalHeartMessage();
  }

  openLetter(): void {
    this.game.openLoveLetter();
    window.setTimeout(() => {
      const audio = this.letterAudio?.nativeElement;

      if (!audio) {
        return;
      }

      audio.currentTime = 0;
      void audio.play();
    });
  }

  hideMissingAsset(event: Event): void {
    const image = event.target as HTMLImageElement;
    image.hidden = true;
  }

  private scheduleFailure(): void {
    this.clearFailTimer();
    this.failTimer = window.setTimeout(() => this.game.failHeartFlight(), this.game.config.heartFlightTimeoutMs);
  }

  private clearFailTimer(): void {
    if (this.failTimer) {
      window.clearTimeout(this.failTimer);
      this.failTimer = null;
    }
  }

  private clearTimers(): void {
    this.clearFailTimer();
    this.clearVideoTimer();

    if (this.bottleTimer) {
      window.clearTimeout(this.bottleTimer);
      this.bottleTimer = null;
    }
  }

  private clearVideoTimer(): void {
    if (this.videoTimer) {
      window.clearTimeout(this.videoTimer);
      this.videoTimer = null;
    }
  }
}
