import { useCallback, useEffect, useRef } from "react";
import shadowMusic from "../assets/audio/shadow_music.mp3";
import sonicMusic from "../assets/audio/sonic_music.mp3";

const COMPLETION_BEAT_MS = 180;
const COMPLETION_VOLUME = 0.024;

const MUSIC_BY_MODE = {
  dark: {
    src: shadowMusic,
    volume: 0.006,
  },
  normal: {
    src: sonicMusic,
    volume: 0.006,
  },
};

const BEEP_VOLUME = 0.045;
const COMPLETION_MELODY = [
  523.25,
  659.25,
  783.99,
  1046.5,
  880,
  783.99,
  659.25,
  783.99,
  698.46,
  880,
  1046.5,
  1174.66,
  1046.5,
  880,
  783.99,
  659.25,
];

const COMPLETION_BASS = [130.81, 196, 174.61, 196];

const createCompletionLoop = (ctx) => {
  const masterGain = ctx.createGain();
  let step = 0;
  let intervalId;
  let stopped = false;

  masterGain.gain.setValueAtTime(COMPLETION_VOLUME, ctx.currentTime);
  masterGain.connect(ctx.destination);

  const playTone = (frequency, duration, type = "square", volume = 1) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, now);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  };

  const tick = () => {
    if (stopped) return;

    const melodyFrequency = COMPLETION_MELODY[step % COMPLETION_MELODY.length];
    playTone(melodyFrequency, 0.13, "square", 0.9);

    if (step % 4 === 0) {
      const bassFrequency = COMPLETION_BASS[(step / 4) % COMPLETION_BASS.length];
      playTone(bassFrequency, 0.28, "triangle", 0.55);
    }

    step += 1;
  };

  tick();
  intervalId = window.setInterval(tick, COMPLETION_BEAT_MS);

  return {
    stop() {
      stopped = true;
      window.clearInterval(intervalId);
      masterGain.gain.cancelScheduledValues(ctx.currentTime);
      masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      window.setTimeout(() => masterGain.disconnect(), 80);
    },
  };
};

export function useAudioEngine() {
  const ctxRef = useRef(null);
  const musicRef = useRef(null);
  const musicTokenRef = useRef(0);

  const ensureContext = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }

    return ctxRef.current;
  }, []);

  const beep = useCallback((type = "correct") => {
    const ctx = ensureContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "correct") {
      osc.type = "square";
      osc.frequency.setValueAtTime(740, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1180, ctx.currentTime + 0.12);
    } else {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(170, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.18);
    }

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(BEEP_VOLUME, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    osc.start();
    osc.stop(ctx.currentTime + 0.26);
  }, [ensureContext]);

  const stopMusic = useCallback(() => {
    musicTokenRef.current += 1;

    if (musicRef.current) {
      if (typeof musicRef.current.stop === "function") {
        musicRef.current.stop();
      } else {
        musicRef.current.pause();
        musicRef.current.currentTime = 0;
      }

      musicRef.current = null;
    }
  }, []);

  const startMusic = useCallback((mode = "normal") => {
    stopMusic();

    if (mode === "completion") {
      musicRef.current = createCompletionLoop(ensureContext());
      return;
    }

    const token = musicTokenRef.current;
    const track = MUSIC_BY_MODE[mode] ?? MUSIC_BY_MODE.normal;
    const audio = new Audio(track.src);

    audio.loop = true;
    audio.volume = track.volume;
    musicRef.current = audio;

    audio.play().then(() => {
      if (musicTokenRef.current !== token || musicRef.current !== audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    }).catch(() => {
      if (musicRef.current === audio) {
        musicRef.current = null;
      }
    });
  }, [ensureContext, stopMusic]);

  useEffect(() => stopMusic, [stopMusic]);

  return { beep, startMusic, stopMusic };
}
