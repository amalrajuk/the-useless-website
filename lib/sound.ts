// Web Audio API Sound Synthesizer - 100% Client-Side, Zero External Assets

type SoundType =
  | "boing"
  | "sadTrombone"
  | "applause"
  | "wrongBuzzer"
  | "dramatic"
  | "pew"
  | "squeak"
  | "chime"
  | "click"
  | "alarm"
  | "confetti";

let audioCtx: AudioContext | null = null;
let muted = false;
const listeners: Array<(muted: boolean) => void> = [];

export function initAudio() {
  if (typeof window === "undefined") return;
  const stored = localStorage.getItem("useless_audio_muted");
  if (stored !== null) {
    muted = stored === "true";
  }
}

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isAudioMuted(): boolean {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("useless_audio_muted");
    if (stored !== null) return stored === "true";
  }
  return muted;
}

export function setAudioMuted(value: boolean) {
  muted = value;
  if (typeof window !== "undefined") {
    localStorage.setItem("useless_audio_muted", String(value));
  }
  listeners.forEach((fn) => fn(muted));
}

export function toggleAudioMuted(): boolean {
  const newVal = !isAudioMuted();
  setAudioMuted(newVal);
  return newVal;
}

export function onMuteChange(listener: (muted: boolean) => void) {
  listeners.push(listener);
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

export function playSound(type: SoundType) {
  if (isAudioMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    switch (type) {
      case "click": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
        break;
      }

      case "boing": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.35);
        osc.frequency.exponentialRampToValueAtTime(450, now + 0.45);

        // add a bit of vibrato
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 14;
        lfoGain.gain.value = 40;
        lfo.connect(osc.frequency);
        lfo.start(now);
        lfo.stop(now + 0.5);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.5);
        break;
      }

      case "sadTrombone": {
        const notes = [
          { freq: 311.13, dur: 0.35 }, // Eb4
          { freq: 293.66, dur: 0.35 }, // D4
          { freq: 277.18, dur: 0.35 }, // Db4
          { freq: 261.63, dur: 0.8 },  // C4
        ];
        let noteTime = now;
        notes.forEach((note, index) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(note.freq, noteTime);

          if (index === notes.length - 1) {
            // Wah wah pitch drop on final note
            osc.frequency.linearRampToValueAtTime(note.freq - 40, noteTime + note.dur);
          }

          gain.gain.setValueAtTime(0.2, noteTime);
          gain.gain.exponentialRampToValueAtTime(0.01, noteTime + note.dur - 0.05);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(noteTime);
          osc.stop(noteTime + note.dur);
          noteTime += note.dur + 0.05;
        });
        break;
      }

      case "wrongBuzzer": {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.type = "sawtooth";
        osc2.type = "sawtooth";
        osc1.frequency.setValueAtTime(130, now);
        osc2.frequency.setValueAtTime(138, now); // dissonant beating
        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.4);
        osc2.stop(now + 0.4);
        break;
      }

      case "dramatic": {
        // Orchestral hit simulation: Low punch + brass chord + cymbal wash
        const freqs = [65.4, 130.8, 196.0, 261.6, 311.1];
        freqs.forEach((f) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(f, now);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 1.2);
        });
        break;
      }

      case "pew": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.2);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
        break;
      }

      case "squeak": {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(1800, now);
        osc.frequency.linearRampToValueAtTime(2800, now + 0.08);
        osc.frequency.linearRampToValueAtTime(1400, now + 0.16);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
        break;
      }

      case "applause": {
        // Scatter noise bursts for tiny polite golf applause
        for (let i = 0; i < 7; i++) {
          const clapTime = now + i * 0.12 + Math.random() * 0.05;
          const bufferSize = ctx.sampleRate * 0.05;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let j = 0; j < bufferSize; j++) {
            data[j] = Math.random() * 2 - 1;
          }
          const noise = ctx.createBufferSource();
          noise.buffer = buffer;
          const filter = ctx.createBiquadFilter();
          filter.type = "bandpass";
          filter.frequency.value = 1200 + Math.random() * 400;
          filter.Q.value = 2;
          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.18, clapTime);
          gain.gain.exponentialRampToValueAtTime(0.01, clapTime + 0.05);

          noise.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          noise.start(clapTime);
          noise.stop(clapTime + 0.05);
        }
        break;
      }

      case "chime": {
        // Bright triumphant chime chord: C6 - E6 - G6 - C7
        const chord = [1046.5, 1318.5, 1567.98, 2093.0];
        chord.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, now + i * 0.07);
          gain.gain.setValueAtTime(0.18, now + i * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.6);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.07);
          osc.stop(now + i * 0.07 + 0.6);
        });
        break;
      }

      case "alarm": {
        // Alternating siren tone
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.linearRampToValueAtTime(1400, now + 0.2);
        osc.frequency.linearRampToValueAtTime(800, now + 0.4);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.45);
        break;
      }

      case "confetti": {
        // Party pop chirp
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(1800, now + 0.1);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
        break;
      }
    }
  } catch (err) {
    console.warn("Audio playback error:", err);
  }
}
