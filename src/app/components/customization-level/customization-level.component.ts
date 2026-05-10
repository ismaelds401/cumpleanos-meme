import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ClothingCategoryId } from '../../data/game-config';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-customization-level',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, NgStyle],
  templateUrl: './customization-level.component.html',
  styleUrl: './customization-level.component.css'
})
export class CustomizationLevelComponent {
  readonly game = inject(GameService);

  optionStyle(categoryId: ClothingCategoryId, optionId?: string): Record<string, string> {
    return {
      '--item-color': optionId ? this.findOptionColor(categoryId, optionId) : this.selectedColor(categoryId)
    };
  }

  isSelected(categoryId: ClothingCategoryId, optionId: string): boolean {
    return this.game.state().selectedOutfit[categoryId] === optionId;
  }

  selectedColor(categoryId: ClothingCategoryId): string {
    const selectedOptionId = this.game.state().selectedOutfit[categoryId];

    if (!selectedOptionId) {
      return this.defaultColor(categoryId);
    }

    return this.findOptionColor(categoryId, selectedOptionId);
  }

  private findOptionColor(categoryId: ClothingCategoryId, optionId: string): string {
    return (
      this.game.config.customizationOptions
        .find((category) => category.id === categoryId)
        ?.options.find((option) => option.id === optionId)?.color ?? this.defaultColor(categoryId)
    );
  }

  private defaultColor(categoryId: ClothingCategoryId): string {
    const defaults: Record<ClothingCategoryId, string> = {
      polo: '#cbd5e1',
      pantalon: '#94a3b8',
      zapatillas: '#e2e8f0',
      gorra: '#cbd5e1'
    };

    return defaults[categoryId];
  }
}
