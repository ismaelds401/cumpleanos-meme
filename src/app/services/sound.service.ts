import { Injectable } from '@angular/core';

type WindowWithWebAudio = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

type OscillatorWave = OscillatorType;

interface ToneStep {
  frequency: number;
  duration: number;
  type?: OscillatorWave;
  volume?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  playTreasureCorrect(): void {
    this.playMelody([
      { frequency: 659.25, duration: 0.1, type: 'triangle', volume: 0.16 },
      { frequency: 783.99, duration: 0.1, type: 'triangle', volume: 0.18 },
      { frequency: 1046.5, duration: 0.16, type: 'triangle', volume: 0.2 }
    ]);
  }

  playTreasureVictory(): void {
    this.playMelody([
      { frequency: 523.25, duration: 0.16, type: 'triangle', volume: 0.16 },
      { frequency: 659.25, duration: 0.16, type: 'triangle', volume: 0.18 },
      { frequency: 783.99, duration: 0.16, type: 'triangle', volume: 0.18 },
      { frequency: 1046.5, duration: 0.18, type: 'triangle', volume: 0.2 },
      { frequency: 783.99, duration: 0.16, type: 'triangle', volume: 0.16 },
      { frequency: 987.77, duration: 0.16, type: 'triangle', volume: 0.18 },
      { frequency: 1174.66, duration: 0.18, type: 'triangle', volume: 0.18 },
      { frequency: 1318.51, duration: 0.24, type: 'triangle', volume: 0.2 }
    ]);
  }

  playCreationElement(elementId: string): void {
    const soundByElement: Record<string, ToneStep[]> = {
      amabilidad: [
        { frequency: 392, duration: 0.14, type: 'sine', volume: 0.12 },
        { frequency: 523.25, duration: 0.18, type: 'sine', volume: 0.14 }
      ],
      comprension: [
        { frequency: 329.63, duration: 0.16, type: 'triangle', volume: 0.12 },
        { frequency: 440, duration: 0.18, type: 'triangle', volume: 0.13 }
      ],
      alegria: [
        { frequency: 659.25, duration: 0.09, type: 'square', volume: 0.09 },
        { frequency: 880, duration: 0.1, type: 'square', volume: 0.1 },
        { frequency: 1174.66, duration: 0.12, type: 'triangle', volume: 0.14 }
      ],
      ternura: [
        { frequency: 587.33, duration: 0.16, type: 'sine', volume: 0.1 },
        { frequency: 783.99, duration: 0.2, type: 'sine', volume: 0.12 }
      ],
      fortaleza: [
        { frequency: 261.63, duration: 0.12, type: 'sawtooth', volume: 0.08 },
        { frequency: 392, duration: 0.2, type: 'triangle', volume: 0.15 }
      ],
      carino: [
        { frequency: 783.99, duration: 0.08, type: 'triangle', volume: 0.12 },
        { frequency: 987.77, duration: 0.08, type: 'triangle', volume: 0.13 },
        { frequency: 1318.51, duration: 0.14, type: 'sine', volume: 0.11 }
      ],
      impaciencia: [
        { frequency: 220, duration: 0.12, type: 'sawtooth', volume: 0.08 },
        { frequency: 185, duration: 0.18, type: 'sawtooth', volume: 0.07 }
      ],
      enojo: [
        { frequency: 146.83, duration: 0.14, type: 'square', volume: 0.08 },
        { frequency: 123.47, duration: 0.18, type: 'square', volume: 0.07 }
      ],
      tristeza: [
        { frequency: 293.66, duration: 0.18, type: 'sine', volume: 0.09 },
        { frequency: 246.94, duration: 0.22, type: 'sine', volume: 0.08 }
      ]
    };

    this.playMelody(soundByElement[elementId] ?? soundByElement['carino']);
  }

  playApplause(): void {
    const AudioContextClass = this.getAudioContextClass();

    if (!AudioContextClass) {
      return;
    }

    const context = new AudioContextClass();
    const startTime = context.currentTime + 0.02;

    for (let index = 0; index < 28; index += 1) {
      const clapStart = startTime + index * 0.045 + Math.random() * 0.02;
      const duration = 0.035 + Math.random() * 0.025;
      const bufferSize = Math.max(1, Math.floor(context.sampleRate * duration));
      const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
      const data = buffer.getChannelData(0);

      for (let sample = 0; sample < bufferSize; sample += 1) {
        data[sample] = (Math.random() * 2 - 1) * (1 - sample / bufferSize);
      }

      const source = context.createBufferSource();
      const filter = context.createBiquadFilter();
      const gain = context.createGain();

      source.buffer = buffer;
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(900 + Math.random() * 900, clapStart);
      filter.Q.setValueAtTime(0.9, clapStart);
      gain.gain.setValueAtTime(0.0001, clapStart);
      gain.gain.exponentialRampToValueAtTime(0.18, clapStart + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, clapStart + duration);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(context.destination);
      source.start(clapStart);
      source.stop(clapStart + duration);
    }

    window.setTimeout(() => void context.close(), 1800);
  }

  private playMelody(steps: ToneStep[]): void {
    const AudioContextClass = this.getAudioContextClass();

    if (!AudioContextClass) {
      return;
    }

    const context = new AudioContextClass();
    let noteStart = context.currentTime + 0.03;

    steps.forEach((step) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const volume = step.volume ?? 0.14;

      oscillator.type = step.type ?? 'sine';
      oscillator.frequency.setValueAtTime(step.frequency, noteStart);
      gain.gain.setValueAtTime(0.0001, noteStart);
      gain.gain.exponentialRampToValueAtTime(volume, noteStart + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + step.duration);

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(noteStart);
      oscillator.stop(noteStart + step.duration + 0.02);
      noteStart += step.duration;
    });

    window.setTimeout(() => void context.close(), Math.ceil((noteStart - context.currentTime + 0.3) * 1000));
  }

  private getAudioContextClass(): typeof AudioContext | undefined {
    const audioWindow = window as WindowWithWebAudio;

    return audioWindow.AudioContext ?? audioWindow.webkitAudioContext;
  }
}
