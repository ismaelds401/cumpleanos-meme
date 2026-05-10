import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';

import { CreationElement } from '../../data/game-config';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-creation-level',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './creation-level.component.html',
  styleUrl: './creation-level.component.css'
})
export class CreationLevelComponent {
  readonly game = inject(GameService);

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
      this.game.addCreationElement(elementId);
    }
  }

  addByClick(element: CreationElement): void {
    this.game.addCreationElement(element.id);
  }
}
