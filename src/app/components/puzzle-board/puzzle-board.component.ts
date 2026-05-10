import { Component, inject } from '@angular/core';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';

import { PuzzlePiece } from '../../models/puzzle-piece.model';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-puzzle-board',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, NgStyle],
  templateUrl: './puzzle-board.component.html',
  styleUrl: './puzzle-board.component.css'
})
export class PuzzleBoardComponent {
  readonly game = inject(GameService);

  pieceStyle(piece: PuzzlePiece): Record<string, string> {
    const columns = this.game.config.puzzleColumns;
    const rows = this.game.config.puzzleRows;
    const zeroIndex = piece.id - 1;
    const column = zeroIndex % columns;
    const row = Math.floor(zeroIndex / columns);
    const x = columns === 1 ? 0 : (column / (columns - 1)) * 100;
    const y = rows === 1 ? 0 : (row / (rows - 1)) * 100;

    return {
      'background-image': `url("${this.game.config.puzzleImageUrl}")`,
      'background-size': `${columns * 100}% ${rows * 100}%`,
      'background-position': `${x}% ${y}%`
    };
  }
}
