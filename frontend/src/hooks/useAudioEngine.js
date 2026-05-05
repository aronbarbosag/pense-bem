import { useCallback, useEffect, useRef } from "react";
import shadowMusic from "../assets/audio/shadow_music.mp3";
import sonicMusic from "../assets/audio/sonic_music.mp3";

const MUSIC_BY_MODE = {
  dark: {
    src: shadowMusic,
    volume: 0.002,
  },
  normal: {
    src: sonicMusic,
    volume: 0.002,
  },
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
    gain.gain.exponentialRampToValueAtTime(0.16, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    osc.start();
    osc.stop(ctx.currentTime + 0.26);
  }, [ensureContext]);

  const stopMusic = useCallback(() => {
    musicTokenRef.current += 1;

    if (musicRef.current) {
      musicRef.current.pause();
      musicRef.current.currentTime = 0;
      musicRef.current = null;
    }
  }, []);

  const startMusic = useCallback((mode = "normal") => {
    stopMusic();

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
  }, [stopMusic]);

  useEffect(() => stopMusic, [stopMusic]);

  return { beep, startMusic, stopMusic };
}
