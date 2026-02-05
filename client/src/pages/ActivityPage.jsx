import { useState, useEffect, useCallback } from 'react';
import Confetti from '../components/Confetti';
import Mascot, { messages } from '../components/Mascot';

function ActivityPage({ routine, onComplete, onBack, mascotTheme = 'star', calmingMode = false }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showStepComplete, setShowStepComplete] = useState(false);
  const [encouragement, setEncouragement] = useState('');
  const [showCompletion, setShowCompletion] = useState(false);

  const currentStep = routine.steps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / routine.steps.length) * 100;

  // Generate random encouragement
  const getRandomEncouragement = () => {
    const msgs = messages.encouragement;
    return msgs[Math.floor(Math.random() * msgs.length)];
  };

  // Initialize timer when step changes
  useEffect(() => {
    setEncouragement(getRandomEncouragement());
    if (currentStep.duration > 0) {
      setTimeLeft(currentStep.duration);
      setIsTimerActive(true);
    } else {
      setIsTimerActive(false);
    }
  }, [currentStepIndex, currentStep.duration]);

  // Timer countdown effect
  useEffect(() => {
    if (!isTimerActive || timeLeft <= 0) {
      setIsTimerActive(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);

  // Auto-advance when timer completes
  useEffect(() => {
    if (timeLeft === 0 && currentStep.duration > 0 && !isTimerActive) {
      const delay = setTimeout(() => {
        handleNext();
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [timeLeft, isTimerActive, currentStep.duration]);

  const handleNext = useCallback(() => {
    if (currentStepIndex < routine.steps.length - 1) {
      // Show step completion animation
      if (!calmingMode) {
        setShowStepComplete(true);
        setShowConfetti(true);
        setTimeout(() => {
          setShowStepComplete(false);
          setShowConfetti(false);
        }, 1000);
      }
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Show completion celebration
      setShowCompletion(true);
      if (!calmingMode) {
        setShowConfetti(true);
      }
      setTimeout(() => {
        onComplete(1);
      }, 2500);
    }
  }, [currentStepIndex, routine.steps.length, onComplete, calmingMode]);

  const handleSkip = () => {
    handleNext();
  };

  // Get timer color based on progress
  const getTimerColor = () => {
    const percentage = timeLeft / currentStep.duration;
    if (percentage > 0.6) return '#4ECDC4';
    if (percentage > 0.3) return '#FFE66D';
    return '#FF6B9D';
  };

  if (showCompletion) {
    return (
      <div className="page-content activity-page completion-screen">
        <Confetti isActive={showConfetti} />
        <div className="celebration-container">
          <div className="celebration-emoji">🎉</div>
          <h1 className="celebration-title">Amazing Job!</h1>
          <p className="celebration-message">You completed {routine.name}!</p>
          <div className="star-earned">
            <span className="star-icon pulse">⭐</span>
            <span>+1 Star Earned!</span>
          </div>
          <Mascot
            theme={mascotTheme}
            mood="cheering"
            message="YAY! You're a superstar!"
            size="large"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="page-content activity-page" style={{ '--routine-color': routine.color }}>
      <Confetti isActive={showConfetti} />

      <div className="activity-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="header-title">{routine.emoji} {routine.name}</div>
        <div className="step-counter">{currentStepIndex + 1}/{routine.steps.length}</div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
              background: routine.gradient
            }}
          ></div>
        </div>
      </div>

      <div className="encouragement-banner">
        <Mascot
          theme={mascotTheme}
          mood="happy"
          message={encouragement}
          size="small"
          showMessage={true}
        />
      </div>

      <div className="activity-main">
        <div className={`step-display ${showStepComplete ? 'step-complete-animation' : ''}`}>
          <div className="step-emoji-container">
            <span className="step-emoji bounce">{currentStep.emoji}</span>
          </div>
          <div className="step-text">{currentStep.text}</div>

          {currentStep.duration > 0 ? (
            <div className="timer-container">
              <svg viewBox="0 0 200 200" className="timer-ring">
                <circle cx="100" cy="100" r="90" className="timer-ring-bg" />
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  className="timer-ring-progress"
                  style={{
                    strokeDashoffset: `${565.48 * (1 - timeLeft / currentStep.duration)}`,
                    stroke: getTimerColor()
                  }}
                />
              </svg>
              <div className="timer-number" style={{ color: getTimerColor() }}>
                {timeLeft}s
              </div>
            </div>
          ) : (
            <button
              className="primary-button bounce-hover"
              onClick={handleNext}
            >
              ✓ Done!
            </button>
          )}
        </div>

        <div className="step-controls">
          {currentStep.duration > 0 && isTimerActive && (
            <button className="secondary-button" onClick={handleSkip}>
              Skip Step →
            </button>
          )}
        </div>

        {currentStepIndex < routine.steps.length - 1 && (
          <div className="next-step-preview glass-card">
            <div className="preview-label">🔜 Next Step</div>
            <div className="preview-item">
              <div className="preview-emoji">{routine.steps[currentStepIndex + 1].emoji}</div>
              <div className="preview-text">{routine.steps[currentStepIndex + 1].text}</div>
            </div>
          </div>
        )}

        {currentStepIndex === routine.steps.length - 1 && (
          <div className="completion-hint">
            {currentStep.duration > 0 && isTimerActive
              ? '⏳ Almost there...'
              : '🎉 Last step! You\'re almost done!'}
          </div>
        )}
      </div>
    </div>
  );
}

export default ActivityPage;
