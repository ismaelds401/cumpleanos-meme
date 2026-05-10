import { PuzzlePiece } from './puzzle-piece.model';
import { OutfitSelection } from '../data/game-config';

export type GamePhase = 'home' | 'playing' | 'customizing' | 'treasure' | 'creating' | 'heartFlight' | 'finished';
export type AnswerStatus = 'idle' | 'correct' | 'incorrect';
export type CustomizationStatus = 'idle' | 'correct' | 'incorrect';
export type TreasureStatus = 'idle' | 'correct' | 'incorrect';
export type CreationStatus = 'idle' | 'correct' | 'incorrect' | 'complete';
export type HeartFlightStatus =
  | 'idle'
  | 'inflating'
  | 'failed'
  | 'flying'
  | 'bottle'
  | 'bottleCollected'
  | 'delivered'
  | 'letterOpen'
  | 'finalMessage';

export interface GameState {
  phase: GamePhase;
  currentQuestionIndex: number;
  score: number;
  attempts: number;
  correctAnswers: number;
  completedQuestionIds: number[];
  pieces: PuzzlePiece[];
  selectedAnswer: string | null;
  feedbackMessage: string;
  answerStatus: AnswerStatus;
  selectedOutfit: OutfitSelection;
  customizationStatus: CustomizationStatus;
  customizationMessage: string;
  activeTreasurePointId: number | null;
  completedTreasurePointIds: number[];
  treasureStatus: TreasureStatus;
  treasureMessage: string;
  treasureChestOpen: boolean;
  selectedCreationElementIds: string[];
  creationStatus: CreationStatus;
  creationMessage: string;
  birthdayPersonFormed: boolean;
  heartFlightClicks: number;
  heartFlightStatus: HeartFlightStatus;
  heartFlightMessage: string;
  loveLetterOpened: boolean;
}
