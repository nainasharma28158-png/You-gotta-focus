import { AmbientSoundType } from '../types';

class SoundService {
  private audioCtx: AudioContext | null = null;
  private ambientSourceNode: AudioNode | null = null;
  private ambientGainNode: GainNode | null = null;
  private ambientInterval: number | null = null;
  private speechUtterance: SpeechSynthesisUtterance | null = null;

  private getAudioContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  /**
   * Plays a tranquil, rich Tibetan singing bowl / zen chime
   * Uses fundamental + harmonically pleasing overtone ratios
   */
  public playZenChime(volume: number = 0.5): void {
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume * 0.4, now);
      masterGain.connect(ctx.destination);

      // Bell frequencies: fundamental + harmonics
      const frequencies = [528, 528 * 1.5, 528 * 2.76, 528 * 4.2];
      const gains = [0.6, 0.3, 0.15, 0.05];

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        // Exponential decay for soothing sustain
        const decayDuration = 2.4 + idx * 0.4;
        gain.gain.setValueAtTime(gains[idx], now);
        gain.gain.exponentialRampToValueAtTime(0.00001, now + decayDuration);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + decayDuration);
      });
    } catch {
      // AudioContext not allowed before user interaction
    }
  }

  /**
   * Plays a gentle tick for quick user actions
   */
  public playSoftClick(volume: number = 0.2): void {
    try {
      const ctx = this.getAudioContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.03);

      gain.gain.setValueAtTime(volume * 0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {
      // ignore
    }
  }

  /**
   * Controls ongoing ambient background sound
   */
  public setAmbientSound(type: AmbientSoundType, volume: number = 0.3): void {
    this.stopAmbientSound();

    if (type === 'off' || volume <= 0) {
      return;
    }

    try {
      const ctx = this.getAudioContext();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      this.ambientGainNode = masterGain;

      switch (type) {
        case 'brownNoise':
          this.startBrownNoise(ctx, masterGain);
          break;
        case 'rain':
          this.startRainSound(ctx, masterGain);
          break;
        case 'binaural':
          this.startBinauralBeats(ctx, masterGain);
          break;
        case 'metronome':
          this.startMetronome(ctx, masterGain);
          break;
      }
    } catch (err) {
      console.warn('Ambient sound failed to start:', err);
    }
  }

  public updateAmbientVolume(volume: number): void {
    if (this.ambientGainNode && this.audioCtx) {
      this.ambientGainNode.gain.setValueAtTime(Math.max(0, Math.min(1, volume)), this.audioCtx.currentTime);
    }
  }

  public stopAmbientSound(): void {
    if (this.ambientInterval !== null) {
      window.clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
    if (this.ambientSourceNode) {
      try {
        if ('stop' in this.ambientSourceNode && typeof (this.ambientSourceNode as AudioScheduledSourceNode).stop === 'function') {
          (this.ambientSourceNode as AudioScheduledSourceNode).stop();
        }
        this.ambientSourceNode.disconnect();
      } catch {
        // ignore
      }
      this.ambientSourceNode = null;
    }
    if (this.ambientGainNode) {
      try {
        this.ambientGainNode.disconnect();
      } catch {
        // ignore
      }
      this.ambientGainNode = null;
    }
  }

  // Brown noise generation via audio buffer
  private startBrownNoise(ctx: AudioContext, destination: GainNode): void {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5; // Compensate for low amplitude
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Low-pass filter to keep it deep and rumbling
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, ctx.currentTime);

    noise.connect(filter);
    filter.connect(destination);
    noise.start();
    this.ambientSourceNode = noise;
  }

  // Rain sound simulation
  private startRainSound(ctx: AudioContext, destination: GainNode): void {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(1000, ctx.currentTime);
    bandpass.Q.setValueAtTime(0.7, ctx.currentTime);

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(1800, ctx.currentTime);

    noise.connect(bandpass);
    bandpass.connect(lowpass);
    lowpass.connect(destination);
    noise.start();
    this.ambientSourceNode = noise;
  }

  // Binaural beats (Alpha 10Hz difference: 216Hz left, 226Hz right)
  private startBinauralBeats(ctx: AudioContext, destination: GainNode): void {
    const oscLeft = ctx.createOscillator();
    const oscRight = ctx.createOscillator();
    const merger = ctx.createChannelMerger(2);

    oscLeft.type = 'sine';
    oscLeft.frequency.setValueAtTime(216, ctx.currentTime);

    oscRight.type = 'sine';
    oscRight.frequency.setValueAtTime(226, ctx.currentTime);

    oscLeft.connect(merger, 0, 0); // left ear
    oscRight.connect(merger, 0, 1); // right ear

    merger.connect(destination);
    oscLeft.start();
    oscRight.start();

    this.ambientSourceNode = oscLeft; // will disconnect on stop
  }

  // Gentle soft metronome click every second
  private startMetronome(ctx: AudioContext, destination: GainNode): void {
    const playTick = () => {
      try {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.02);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

        osc.connect(gain);
        gain.connect(destination);
        osc.start(now);
        osc.stop(now + 0.02);
      } catch {
        // ignore
      }
    };

    playTick();
    this.ambientInterval = window.setInterval(playTick, 1000);
  }

  /**
   * Web Speech API - Text to Speech for break reading
   */
  public speakText(text: string, onEnd?: () => void): void {
    this.stopSpeaking();
    if (!('speechSynthesis' in window)) return;

    // Strip HTML if any
    const plainText = text.replace(/<[^>]*>?/gm, '');
    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Pick a natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      this.speechUtterance = null;
      if (onEnd) onEnd();
    };

    this.speechUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  public stopSpeaking(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.speechUtterance = null;
  }

  public isSpeaking(): boolean {
    return 'speechSynthesis' in window && window.speechSynthesis.speaking;
  }
}

export const soundService = new SoundService();
