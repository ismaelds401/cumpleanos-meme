import { Injectable, computed, signal } from '@angular/core';

import { ClothingCategoryId, CreationElement, GAME_CONFIG } from '../data/game-config';
import { QUESTIONS } from '../data/questions.data';
import { GameState } from '../models/game-state.model';
import { PuzzlePiece } from '../models/puzzle-piece.model';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  readonly questions: Question[] = QUESTIONS;
  readonly config = GAME_CONFIG;

  readonly totalPieces = this.config.puzzleRows * this.config.puzzleColumns;

  readonly state = signal<GameState>(this.createInitialState());

  readonly currentQuestion = computed(() => {
    const index = this.state().currentQuestionIndex;
    return this.questions[index] ?? this.questions[0];
  });

  readonly unlockedPieces = computed(() => this.state().pieces.filter((piece) => piece.unlocked).length);
  readonly progressPercent = computed(() => Math.round((this.unlockedPieces() / this.totalPieces) * 100));
  readonly isCurrentQuestionCompleted = computed(() =>
    this.state().completedQuestionIds.includes(this.currentQuestion().id)
  );
  readonly hasCompleteOutfit = computed(() =>
    Object.values(this.state().selectedOutfit).every((optionId) => optionId !== null)
  );
  readonly unlockedKeys = computed(() => this.state().completedTreasurePointIds.length);
  readonly hasAllTreasureKeys = computed(() => this.unlockedKeys() === this.config.treasurePath.length);
  readonly selectedCreationElements = computed(() =>
    this.state().selectedCreationElementIds
      .map((elementId) => this.config.creationElements.find((element) => element.id === elementId))
      .filter((element): element is CreationElement => Boolean(element))
  );
  readonly creationProgressPercent = computed(() =>
    Math.round((this.state().selectedCreationElementIds.length / this.config.creationTargetElementIds.length) * 100)
  );
  readonly hasFormedBirthdayPerson = computed(
    () => this.state().selectedCreationElementIds.length === this.config.creationTargetElementIds.length
  );
  readonly heartFlightProgressPercent = computed(() =>
    Math.round((this.state().heartFlightClicks / this.config.heartFlightRequiredClicks) * 100)
  );
  readonly activeTreasurePoint = computed(() => {
    const activeId = this.state().activeTreasurePointId;

    return activeId === null ? null : this.config.treasurePath.find((point) => point.id === activeId) ?? null;
  });

  startGame(): void {
    this.state.set({
      ...this.createInitialState(),
      phase: 'playing'
    });
  }

  submitAnswer(answer: string): void {
    const currentQuestion = this.currentQuestion();
    const currentState = this.state();
    const isCorrect = answer === currentQuestion.correctAnswer;

    if (!isCorrect) {
      this.state.update((state) => ({
        ...state,
        attempts: state.attempts + 1,
        selectedAnswer: answer,
        answerStatus: 'incorrect',
        feedbackMessage: `Respuesta incorrecta. ${currentQuestion.explanation}`
      }));
      return;
    }

    const completedQuestionIds = currentState.completedQuestionIds.includes(currentQuestion.id)
      ? currentState.completedQuestionIds
      : [...currentState.completedQuestionIds, currentQuestion.id];

    const correctAnswers = completedQuestionIds.length;
    const pieces = this.unlockPiecesByProgress(correctAnswers);
    const hasFinishedLevelOne = correctAnswers === this.questions.length && pieces.every((piece) => piece.unlocked);

    this.state.update((state) => ({
      ...state,
      attempts: state.attempts + 1,
      score: correctAnswers * this.config.pointsPerCorrectAnswer,
      correctAnswers,
      completedQuestionIds,
      pieces,
      selectedAnswer: answer,
      answerStatus: 'correct',
      feedbackMessage: `Correcto. ${currentQuestion.explanation}`,
      phase: hasFinishedLevelOne ? 'customizing' : state.phase
    }));

    if (!hasFinishedLevelOne) {
      window.setTimeout(() => this.moveToNextPendingQuestion(), 5000);
    }
  }

  selectClothingOption(categoryId: ClothingCategoryId, optionId: string): void {
    this.state.update((state) => ({
      ...state,
      selectedOutfit: {
        ...state.selectedOutfit,
        [categoryId]: optionId
      },
      customizationStatus: 'idle',
      customizationMessage: ''
    }));
  }

  submitCustomization(): void {
    const selectedOutfit = this.state().selectedOutfit;
    const target = this.config.customizationTarget;
    const isCorrect = Object.entries(target).every(
      ([categoryId, optionId]) => selectedOutfit[categoryId as ClothingCategoryId] === optionId
    );

    if (!isCorrect) {
      this.state.update((state) => ({
        ...state,
        attempts: state.attempts + 1,
        customizationStatus: 'incorrect',
        customizationMessage: 'Aun no es el look especial. Revisa la pista e intenta otra vez.'
      }));
      return;
    }

    this.state.update((state) => ({
      ...state,
      attempts: state.attempts + 1,
      score: state.score + this.config.pointsForCustomization,
      customizationStatus: 'correct',
      customizationMessage: 'Correcto. La cumpleanera quedo lista para su sorpresa.'
    }));

    window.setTimeout(() => {
      if (this.state().customizationStatus === 'correct' && this.state().phase === 'customizing') {
        this.state.update((state) => ({
          ...state,
          phase: 'treasure'
        }));
      }
    }, 5000);
  }

  openTreasurePoint(pointId: number): void {
    if (this.state().completedTreasurePointIds.includes(pointId)) {
      return;
    }

    this.state.update((state) => ({
      ...state,
      activeTreasurePointId: pointId,
      treasureStatus: 'idle',
      treasureMessage: ''
    }));
  }

  closeTreasurePoint(): void {
    this.state.update((state) => ({
      ...state,
      activeTreasurePointId: null,
      treasureStatus: 'idle',
      treasureMessage: ''
    }));
  }

  submitTreasureAnswer(answerId: string): void {
    const activePoint = this.activeTreasurePoint();

    if (!activePoint) {
      return;
    }

    if (answerId !== activePoint.correctAnswer) {
      this.state.update((state) => ({
        ...state,
        attempts: state.attempts + 1,
        treasureStatus: 'incorrect',
        treasureMessage: 'Esa no era. Mira bien la imagen e intenta otra vez.'
      }));
      return;
    }

    const completedTreasurePointIds = this.state().completedTreasurePointIds.includes(activePoint.id)
      ? this.state().completedTreasurePointIds
      : [...this.state().completedTreasurePointIds, activePoint.id];
    const hasAllKeys = completedTreasurePointIds.length === this.config.treasurePath.length;

    this.state.update((state) => ({
      ...state,
      attempts: state.attempts + 1,
      score: state.score + this.config.pointsPerTreasureKey,
      completedTreasurePointIds,
      activeTreasurePointId: null,
      treasureStatus: 'correct',
      treasureMessage: hasAllKeys
        ? 'Conseguiste las 6 llaves. El regalo final esta listo para abrirse.'
        : 'Correcto. Ganaste una llave para el regalo final.',
      treasureChestOpen: hasAllKeys
    }));
  }

  finishTreasureLevel(): void {
    if (!this.hasAllTreasureKeys()) {
      return;
    }

    this.state.update((state) => ({
      ...state,
      treasureChestOpen: true,
      phase: 'creating'
    }));
  }

  addCreationElement(elementId: string): void {
    const currentState = this.state();
    const element = this.config.creationElements.find((candidate) => candidate.id === elementId);

    if (!element || currentState.selectedCreationElementIds.includes(elementId) || currentState.birthdayPersonFormed) {
      return;
    }

    const isTargetElement = this.config.creationTargetElementIds.includes(elementId);

    if (!isTargetElement) {
      this.state.update((state) => ({
        ...state,
        attempts: state.attempts + 1,
        creationStatus: 'incorrect',
        creationMessage: `${element.label} no forma parte de su esencia para este portal. Prueba con una cualidad mas bonita.`
      }));
      return;
    }

    const selectedCreationElementIds = [...currentState.selectedCreationElementIds, elementId];
    const isComplete = selectedCreationElementIds.length === this.config.creationTargetElementIds.length;

    this.state.update((state) => ({
      ...state,
      attempts: state.attempts + 1,
      score: isComplete ? state.score + this.config.pointsForCreation : state.score,
      selectedCreationElementIds,
      creationStatus: isComplete ? 'complete' : 'correct',
      creationMessage: isComplete
        ? 'Portal completo. La cumpleanera se formo con sus mejores cualidades.'
        : `${element.label} entro al portal. Sigue reuniendo sus cualidades.`,
      birthdayPersonFormed: isComplete
    }));
  }

  finishCreationLevel(): void {
    if (!this.hasFormedBirthdayPerson()) {
      return;
    }

    this.state.update((state) => ({
      ...state,
      phase: 'heartFlight'
    }));
  }

  pumpHeartFlight(): void {
    const currentState = this.state();

    if (
      currentState.heartFlightStatus === 'flying' ||
      currentState.heartFlightStatus === 'bottle' ||
      currentState.heartFlightStatus === 'bottleCollected' ||
      currentState.heartFlightStatus === 'video' ||
      currentState.heartFlightStatus === 'finalMessage' ||
      currentState.heartFlightStatus === 'letterOpen'
    ) {
      return;
    }

    const heartFlightClicks = Math.min(currentState.heartFlightClicks + 1, this.config.heartFlightRequiredClicks);
    const completed = heartFlightClicks === this.config.heartFlightRequiredClicks;

    this.state.update((state) => ({
      ...state,
      heartFlightClicks,
      heartFlightStatus: completed ? 'flying' : 'inflating',
      heartFlightMessage: completed
        ? 'El corazon esta lleno de amor. Ahora vuela hacia el cielo.'
        : 'Sigue apretando rapido para que el corazon pueda volar.',
      score: completed ? state.score + this.config.pointsForHeartFlight : state.score
    }));
  }

  failHeartFlight(): void {
    const currentState = this.state();

    if (currentState.heartFlightStatus !== 'inflating') {
      return;
    }

    this.state.update((state) => ({
      ...state,
      attempts: state.attempts + 1,
      heartFlightClicks: 0,
      heartFlightStatus: 'failed',
      heartFlightMessage: 'El corazon exploto antes de llegar con su enamorado. Intentalo otra vez, mas rapido.'
    }));
  }

  revealLoveBottle(): void {
    if (this.state().heartFlightStatus !== 'flying') {
      return;
    }

    this.state.update((state) => ({
      ...state,
      heartFlightStatus: 'bottle',
      heartFlightMessage: 'La botella levita en medio del cielo. Haz click para que el chico suba por ella.'
    }));
  }

  collectLoveBottle(): void {
    if (this.state().heartFlightStatus !== 'bottle') {
      return;
    }

    this.state.update((state) => ({
      ...state,
      heartFlightStatus: 'bottleCollected',
      heartFlightMessage: 'El chico subio con su corazon aerostatico y agarro la botella.'
    }));
  }

  playBirthdayVideo(): void {
    if (this.state().heartFlightStatus !== 'bottleCollected') {
      return;
    }

    this.state.update((state) => ({
      ...state,
      heartFlightStatus: 'video',
      heartFlightMessage: 'La botella llego con un video especial para ti.'
    }));
  }

  showFinalHeartMessage(): void {
    if (this.state().heartFlightStatus !== 'video') {
      return;
    }

    this.state.update((state) => ({
      ...state,
      heartFlightStatus: 'finalMessage',
      heartFlightMessage: 'El video termino. Tu carta especial esta lista para abrirse.'
    }));
  }

  openLoveLetter(): void {
    if (this.state().heartFlightStatus !== 'finalMessage') {
      return;
    }

    this.state.update((state) => ({
      ...state,
      heartFlightStatus: 'letterOpen',
      loveLetterOpened: true,
      heartFlightMessage: 'La carta se abrio con una cancion especial.'
    }));
  }

  finishHeartFlightLevel(): void {
    if (this.state().heartFlightStatus !== 'letterOpen') {
      return;
    }

    this.state.update((state) => ({
      ...state,
      phase: 'finished'
    }));
  }

  retryQuestion(): void {
    this.state.update((state) => ({
      ...state,
      selectedAnswer: null,
      answerStatus: 'idle',
      feedbackMessage: ''
    }));
  }

  skipQuestion(): void {
    if (!this.config.allowSkipAfterWrongAnswer) {
      return;
    }

    this.moveToNextPendingQuestion();
  }

  restartGame(): void {
    this.state.set(this.createInitialState());
  }

  private moveToNextPendingQuestion(): void {
    const currentState = this.state();
    const nextIndex = this.findNextPendingQuestionIndex(currentState.currentQuestionIndex);

    this.state.update((state) => ({
      ...state,
      currentQuestionIndex: nextIndex,
      selectedAnswer: null,
      answerStatus: 'idle',
      feedbackMessage: ''
    }));
  }

  private findNextPendingQuestionIndex(fromIndex: number): number {
    const completed = new Set(this.state().completedQuestionIds);

    for (let offset = 1; offset <= this.questions.length; offset += 1) {
      const candidateIndex = (fromIndex + offset) % this.questions.length;

      if (!completed.has(this.questions[candidateIndex].id)) {
        return candidateIndex;
      }
    }

    return fromIndex;
  }

  private unlockPiecesByProgress(correctAnswers: number): PuzzlePiece[] {
    const piecesToUnlock = Math.round((correctAnswers / this.questions.length) * this.totalPieces);

    return this.createPieces().map((piece) => ({
      ...piece,
      unlocked: piece.id <= piecesToUnlock
    }));
  }

  private createInitialState(): GameState {
    return {
      phase: 'home',
      currentQuestionIndex: 0,
      score: 0,
      attempts: 0,
      correctAnswers: 0,
      completedQuestionIds: [],
      pieces: this.createPieces(),
      selectedAnswer: null,
      feedbackMessage: '',
      answerStatus: 'idle',
      selectedOutfit: {
        polo: null,
        pantalon: null,
        zapatillas: null,
        gorra: null
      },
      customizationStatus: 'idle',
      customizationMessage: '',
      activeTreasurePointId: null,
      completedTreasurePointIds: [],
      treasureStatus: 'idle',
      treasureMessage: '',
      treasureChestOpen: false,
      selectedCreationElementIds: [],
      creationStatus: 'idle',
      creationMessage: '',
      birthdayPersonFormed: false,
      heartFlightClicks: 0,
      heartFlightStatus: 'idle',
      heartFlightMessage: '',
      loveLetterOpened: false
    };
  }

  private createPieces(): PuzzlePiece[] {
    return Array.from({ length: this.totalPieces }, (_, index) => ({
      id: index + 1,
      unlocked: false
    }));
  }
}
