'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { menshQuran, menshQuranMurattal } from './Data';

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const [reciterType, setReciterType] = useState('mojawwad'); // 'mojawwad' or 'murattal'
  const [currentSurahId, setCurrentSurahId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [isLoaded, setIsLoaded] = useState(false);

  const audioRef = useRef(null);

  const playbackList = reciterType === 'mojawwad' ? menshQuran : menshQuranMurattal;
  const currentSurah = currentSurahId ? playbackList.find((s) => s.id === currentSurahId) : null;

  // Initialize Audio Object on Client Side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audio = new Audio();
      audio.preload = 'metadata';
      audioRef.current = audio;

      const handleTimeUpdate = () => {
        setProgress(audio.currentTime);
      };

      const handleDurationChange = () => {
        setDuration(audio.duration || 0);
      };

      const handlePlay = () => {
        setIsPlaying(true);
      };

      const handlePause = () => {
        setIsPlaying(false);
      };

      const handleEnded = () => {
        setIsPlaying(false);
        // Auto-play next Surah
        handleNext();
      };

      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('durationchange', handleDurationChange);
      audio.addEventListener('loadedmetadata', handleDurationChange);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('ended', handleEnded);

      // Restore last played Surah from localStorage if available
      const savedSurahId = localStorage.getItem('mensh_last_surah_id');
      const savedType = localStorage.getItem('mensh_last_reciter_type');
      if (savedSurahId && savedType) {
        setReciterType(savedType);
        setCurrentSurahId(parseInt(savedSurahId));
        setIsLoaded(true);
      }

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('durationchange', handleDurationChange);
        audio.removeEventListener('loadedmetadata', handleDurationChange);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('ended', handleEnded);
        audio.pause();
      };
    }
  }, []);

  // Sync Audio Source when Surah or Reciter Type Changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSurah) return;

    // Save state
    localStorage.setItem('mensh_last_surah_id', currentSurah.id);
    localStorage.setItem('mensh_last_reciter_type', reciterType);

    // If source changed, update and reload
    const currentSrc = audio.src;
    if (currentSrc !== currentSurah.url) {
      audio.src = currentSurah.url;
      audio.load();
      audio.playbackRate = playbackSpeed;
      if (isPlaying) {
        audio.play().catch((err) => {
          console.warn('Audio play interrupted:', err);
          setIsPlaying(false);
        });
      }
    }
  }, [currentSurahId, reciterType, currentSurah]);

  // Sync Playback Speed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const playSurah = (id, type = reciterType, autoplay = true) => {
    const list = type === 'mojawwad' ? menshQuran : menshQuranMurattal;
    const targetSurah = list.find((s) => s.id === id);
    if (!targetSurah) return;

    setReciterType(type);
    setCurrentSurahId(id);
    setIsLoaded(true);

    if (autoplay) {
      setIsPlaying(true);
      // Timeout ensures src update and state commit run before play
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch((err) => {
            console.warn('Audio autoplay failed:', err);
            setIsPlaying(false);
          });
        }
      }, 50);
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !currentSurahId) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Audio toggle play failed:', err);
          setIsPlaying(false);
        });
    }
  };

  const handleNext = () => {
    const nextId = currentSurahId ? currentSurahId + 1 : 1;
    if (nextId <= playbackList.length) {
      playSurah(nextId, reciterType, isPlaying);
    } else {
      playSurah(1, reciterType, false); // Reset to Surah Fatiha without autostarting
    }
  };

  const handlePrev = () => {
    const prevId = currentSurahId ? currentSurahId - 1 : 1;
    if (prevId >= 1) {
      playSurah(prevId, reciterType, isPlaying);
    }
  };

  const seekTo = (time) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = time;
      setProgress(time);
    }
  };

  const changeSpeed = (speed) => {
    const speedVal = parseFloat(speed);
    setPlaybackSpeed(speedVal);
  };

  return (
    <AudioContext.Provider
      value={{
        reciterType,
        currentSurahId,
        isPlaying,
        progress,
        duration,
        playbackSpeed,
        currentSurah,
        playbackList,
        isLoaded,
        playSurah,
        togglePlay,
        nextSurah: handleNext,
        prevSurah: handlePrev,
        seekTo,
        changeSpeed,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
