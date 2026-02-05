function SettingsPage({
  soundEnabled,
  animationEnabled,
  darkMode,
  calmingMode,
  mascotTheme,
  onSoundToggle,
  onAnimationToggle,
  onDarkModeToggle,
  onCalmingModeToggle,
  onMascotThemeChange
}) {
  const mascotOptions = [
    { id: 'star', emoji: '⭐', name: 'Starry' },
    { id: 'bear', emoji: '🧸', name: 'Teddy' },
    { id: 'bunny', emoji: '🐰', name: 'Hoppy' }
  ];

  return (
    <div className="page-content settings-page">
      <div className="settings-header">
        <h2>⚙️ Settings</h2>
        <p className="header-subtitle">Make the app work for you!</p>
      </div>

      <div className="settings-section">
        <h3 className="settings-section-title">🎨 Experience</h3>

        <div className="settings-list">
          <div className="settings-item calming-setting">
            <div className="settings-item-content">
              <div className="settings-item-icon">😌</div>
              <div>
                <h4>Calming Mode</h4>
                <p className="settings-item-description">
                  Softer colors & fewer animations for a peaceful experience
                </p>
              </div>
            </div>
            <div
              className={`toggle-switch ${calmingMode ? 'active' : ''}`}
              onClick={onCalmingModeToggle}
            />
          </div>

          <div className="settings-item">
            <div className="settings-item-content">
              <div className="settings-item-icon">🌙</div>
              <div>
                <h4>Dark Mode</h4>
                <p className="settings-item-description">
                  Easy on the eyes in low light
                </p>
              </div>
            </div>
            <div
              className={`toggle-switch ${darkMode ? 'active' : ''}`}
              onClick={onDarkModeToggle}
            />
          </div>

          <div className="settings-item">
            <div className="settings-item-content">
              <div className="settings-item-icon">✨</div>
              <div>
                <h4>Animations</h4>
                <p className="settings-item-description">
                  Fun bouncy effects and confetti
                </p>
              </div>
            </div>
            <div
              className={`toggle-switch ${animationEnabled ? 'active' : ''}`}
              onClick={onAnimationToggle}
            />
          </div>

          <div className="settings-item">
            <div className="settings-item-content">
              <div className="settings-item-icon">🔊</div>
              <div>
                <h4>Sound Effects</h4>
                <p className="settings-item-description">
                  Audio feedback for actions
                </p>
              </div>
            </div>
            <div
              className={`toggle-switch ${soundEnabled ? 'active' : ''}`}
              onClick={onSoundToggle}
            />
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3 className="settings-section-title">🐻 Choose Your Buddy</h3>
        <p className="settings-section-desc">Pick a friend to cheer you on!</p>

        <div className="mascot-selector">
          {mascotOptions.map((mascot) => (
            <button
              key={mascot.id}
              className={`mascot-option ${mascotTheme === mascot.id ? 'selected' : ''}`}
              onClick={() => onMascotThemeChange(mascot.id)}
            >
              <span className="mascot-option-emoji">{mascot.emoji}</span>
              <span className="mascot-option-name">{mascot.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="info-section glass-card">
        <h4>💡 Tips</h4>
        <div className="info-section-content">
          <div className="info-item">
            <span>🎯</span> Complete routines to earn stars
          </div>
          <div className="info-item">
            <span>🏆</span> Stars unlock special badges
          </div>
          <div className="info-item">
            <span>📊</span> Track your progress on the Dashboard
          </div>
          <div className="info-item">
            <span>😌</span> Use Calming Mode if colors feel too bright
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
