import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';

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

  private failTimer: ReturnType<typeof window.setTimeout> | null = null;
  private bottleTimer: ReturnType<typeof window.setTimeout> | null = null;
  private deliveryTimer: ReturnType<typeof window.setTimeout> | null = null;

  ngOnDestroy(): void {
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

  openLetter(): void {
    this.game.openLoveLetter();
  }

  collectBottle(): void {
    this.clearDeliveryTimer();
    this.game.collectLoveBottle();
    this.deliveryTimer = window.setTimeout(() => this.game.deliverLoveBottle(), 2100);
  }

  deliverBottle(): void {
    this.game.deliverLoveBottle();
  }

  showFinalMessage(): void {
    this.game.showFinalHeartMessage();
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
    this.clearDeliveryTimer();

    if (this.bottleTimer) {
      window.clearTimeout(this.bottleTimer);
      this.bottleTimer = null;
    }
  }

  private clearDeliveryTimer(): void {
    if (this.deliveryTimer) {
      window.clearTimeout(this.deliveryTimer);
      this.deliveryTimer = null;
    }
  }
}
