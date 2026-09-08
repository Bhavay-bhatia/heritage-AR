'use client';

import React, { useState, useEffect } from 'react';

export default function StoryTeller({ artifact }) {
  const [currentLang, setCurrentLang] = useState('en');
  const [isPlaying, setIsPlaying] = useState(false);

  const langMap = {
    en: 'en-US',
    hi: 'hi-IN',
    ta: 'ta-IN',
    te: 'te-IN',
    kn: 'kn-IN',
    bn: 'bn-IN',
    es: 'es-ES',
    fr: 'fr-FR',
  };

  const storyText = artifact.storyText[currentLang] || artifact.storyText['en'];

  useEffect(() => {
    // Stop speech when artifact changes
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  }, [artifact]);

  const handleToggleAudio = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(storyText);
      utterance.lang = langMap[currentLang] || 'en-US';
      utterance.rate = 0.95;

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleLangChange = (newLang) => {
    setCurrentLang(newLang);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  return (
    <div className="story-card">
      <div className="story-header">
        <h4>
          <span>📜</span> Historic Story Narration
        </h4>
        <select
          className="language-picker"
          value={currentLang}
          onChange={(e) => handleLangChange(e.target.value)}
        >
          <option value="en">English</option>
          <option value="hi">हिंदी (Hindi)</option>
          <option value="ta">தமிழ் (Tamil)</option>
          <option value="te">తెలుగు (Telugu)</option>
          <option value="kn">ಕನ್ನಡ (Kannada)</option>
          <option value="bn">বাংলা (Bengali)</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
        </select>
      </div>

      <div className="story-text-box">{storyText}</div>

      <div className="audio-controls">
        <button className="btn-audio-play" onClick={handleToggleAudio}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            {isPlaying ? (
              <>
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </>
            ) : (
              <polygon points="5 3 19 12 5 21 5 3" />
            )}
          </svg>
          <span>{isPlaying ? 'Pause Narration' : 'Listen Story'}</span>
        </button>

        <div className={`audio-wave ${isPlaying ? 'playing' : ''}`}>
          <div className="wave-bar"></div>
          <div className="wave-bar"></div>
          <div className="wave-bar"></div>
          <div className="wave-bar"></div>
        </div>
      </div>
    </div>
  );
}
