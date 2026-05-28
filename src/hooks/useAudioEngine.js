import { Audio } from "expo-av";
import { useCallback, useEffect, useRef } from "react";
import { Vibration } from "react-native";
import shadowMusic from "../assets/audio/shadow_music.mp3";
import sonicMusic from "../assets/audio/sonic_music.mp3";

const MUSIC_BY_MODE = {
  dark: shadowMusic,
  normal: sonicMusic,
};

export function useAudioEngine() {
  const soundRef = useRef(null);

  const stopMusic = useCallback(async () => {
    if (!soundRef.current) return;

    const currentSound = soundRef.current;
    soundRef.current = null;
    await currentSound.stopAsync().catch(() => {});
    await currentSound.unloadAsync().catch(() => {});
  }, []);

  const startMusic = useCallback(async (mode = "normal") => {
    await stopMusic();

    if (mode === "completion") {
      Vibration.vibrate([0, 80, 60, 80, 60, 140]);
      return;
    }

    const source = MUSIC_BY_MODE[mode] ?? MUSIC_BY_MODE.normal;
    const { sound } = await Audio.Sound.createAsync(source, {
      isLooping: true,
      volume: 0.08,
      shouldPlay: true,
    }).catch(() => ({ sound: null }));

    soundRef.current = sound;
  }, [stopMusic]);

  const beep = useCallback((type = "correct") => {
    Vibration.vibrate(type === "correct" ? 45 : [0, 80, 45, 80]);
  }, []);

  useEffect(() => () => {
    stopMusic();
  }, [stopMusic]);

  return { beep, startMusic, stopMusic };
}
