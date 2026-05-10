import { Component, inject } from '@angular/core';
import { NgSwitch, NgSwitchCase } from '@angular/common';

import { CreationLevelComponent } from './components/creation-level/creation-level.component';
import { CustomizationLevelComponent } from './components/customization-level/customization-level.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { HeartFlightLevelComponent } from './components/heart-flight-level/heart-flight-level.component';
import { HomeComponent } from './components/home/home.component';
import { ResultScreenComponent } from './components/result-screen/result-screen.component';
import { TreasurePathComponent } from './components/treasure-path/treasure-path.component';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CustomizationLevelComponent,
    CreationLevelComponent,
    GameBoardComponent,
    HeartFlightLevelComponent,
    HomeComponent,
    NgSwitch,
    NgSwitchCase,
    ResultScreenComponent,
    TreasurePathComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  readonly game = inject(GameService);
}
