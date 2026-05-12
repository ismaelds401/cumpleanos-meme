import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';

import { CreationElement } from '../../data/game-config';
import { GameService } from '../../services/game.service';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-creation-level',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './creation-level.component.html',
  styleUrl: './creation-level.component.css'
})
export class CreationLevelComponent {
  readonly game = inject(GameService);
  private readonly sound = inject(SoundService);

  draggedElementId: string | null = null;
  isPortalActive = false;

  isSelected(elementId: string): boolean {
    return this.game.state().selectedCreationElementIds.includes(elementId);
  }

  startDrag(event: DragEvent, elementId: string): void {
    this.draggedElementId = elementId;
    event.dataTransfer?.setData('text/plain', elementId);
  }

  allowDrop(event: DragEvent): void {
    event.preventDefault();
    this.isPortalActive = true;
  }

  leavePortal(): void {
    this.isPortalActive = false;
  }

  dropOnPortal(event: DragEvent): void {
    event.preventDefault();
    const elementId = event.dataTransfer?.getData('text/plain') || this.draggedElementId;

    this.isPortalActive = false;
    this.draggedElementId = null;

    if (elementId) {
      this.addElementWithSound(elementId);
    }
  }

  addByClick(element: CreationElement): void {
    this.addElementWithSound(element.id);
  }

  private addElementWithSound(elementId: string): void {
    const wasComplete = this.game.hasFormedBirthdayPerson();
    const wasSelected = this.isSelected(elementId);

    this.game.addCreationElement(elementId);

    if (wasComplete || wasSelected) {
      return;
    }

    this.sound.playCreationElement(elementId);

    if (!wasComplete && this.game.hasFormedBirthdayPerson()) {
      window.setTimeout(() => this.sound.playApplause(), 350);
    }
  }
}
