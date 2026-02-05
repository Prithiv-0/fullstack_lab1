import Mascot from '../components/Mascot';

function HomePage({ routines, onSelectRoutine, onDeleteRoutine, stars, completedToday, mascotTheme = 'star', calmingMode = false }) {
  const completionRate = Math.round((completedToday.length / routines.length) * 100);
  const streak = completedToday.length > 0 ? Math.floor(completedToday.length / 2) : 0;

  const tips = [
    "✨ You're doing amazing! Pick a routine to start!",
    "🌟 Every step you take makes you stronger!",
    "💪 Small steps lead to big achievements!",
    "🎉 You've got this, superstar!",
    "🌈 Make today colorful with healthy habits!"
  ];

  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="page-content home-page">
      <div className="welcome-section">
        <Mascot
          theme={mascotTheme}
          mood={completedToday.length > 0 ? 'happy' : 'normal'}
          size="medium"
          showMessage={true}
        />
      </div>

      <div className="daily-tip">
        <div className="daily-tip-title">💡 Daily Tip</div>
        <div className="daily-tip-text">{randomTip}</div>
      </div>

      <div className="home-header">
        <div>
          <h1>Daily Wellness</h1>
          <p className="header-subtitle">Build positive habits today ✨</p>
        </div>
      </div>

      <div className="stats-bar">
        <div className="stat-mini stat-stars">
          <div className="stat-mini-icon">⭐</div>
          <div className="stat-mini-value">{stars}</div>
          <div className="stat-mini-label">Stars</div>
        </div>
        <div className="stat-mini stat-streak">
          <div className="stat-mini-icon">🔥</div>
          <div className="stat-mini-value">{streak}</div>
          <div className="stat-mini-label">Streak</div>
        </div>
        <div className="stat-mini stat-progress">
          <div className="stat-mini-icon">📊</div>
          <div className="stat-mini-value">{completionRate}%</div>
          <div className="stat-mini-label">Today</div>
        </div>
      </div>

      <h3 className="section-title">🎯 Pick a Routine!</h3>

      <div className="routines-grid">
        {routines.map((routine) => {
          const isCompleted = completedToday.includes(routine.id);
          return (
            <button
              key={routine.id}
              className={`routine-card ${isCompleted ? 'completed' : ''} ${calmingMode ? 'calming' : ''}`}
              onClick={() => onSelectRoutine(routine)}
              style={{
                '--card-color': routine.color,
                '--card-gradient': routine.gradient
              }}
            >
              <div className="routine-card-bg" style={{ background: routine.gradient }}></div>
              <span className="routine-emoji">{routine.emoji}</span>
              <div className="routine-name">{routine.name}</div>
              {isCompleted && (
                <div className="completed-badge">
                  <span>✓</span>
                </div>
              )}

              {routine.isCustom && (
                <span
                  className="delete-routine-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onDeleteRoutine(routine.id);
                  }}
                  title="Delete Routine"
                  role="button"
                  tabIndex={0}
                >
                  🗑️
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
