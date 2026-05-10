import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';

import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly game = inject(GameService);
}
