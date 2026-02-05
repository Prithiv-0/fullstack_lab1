function RewardsPage({ stars, completedRoutines, totalRoutines, calmingMode = false }) {
  const rewards = [
    { id: 1, name: 'Bronze Starter', stars: 10, emoji: '🥉', unlocked: stars >= 10 },
    { id: 2, name: 'Silver Achiever', stars: 25, emoji: '🥈', unlocked: stars >= 25 },
    { id: 3, name: 'Gold Master', stars: 50, emoji: '🥇', unlocked: stars >= 50 },
    { id: 4, name: 'Platinum Elite', stars: 100, emoji: '💎', unlocked: stars >= 100 },
    { id: 5, name: 'Diamond Legend', stars: 250, emoji: '✨', unlocked: stars >= 250 },
    { id: 6, name: 'Routine Specialist', stars: 0, emoji: '🌟', unlocked: completedRoutines.length >= 5 },
    { id: 7, name: 'Completion Expert', stars: 0, emoji: '🎯', unlocked: completedRoutines.length >= 10 },
    { id: 8, name: 'Wellness Champion', stars: 0, emoji: '🏆', unlocked: completedRoutines.length >= totalRoutines }
  ];

  const unlockedCount = rewards.filter(r => r.unlocked).length;
  const nextReward = rewards.find(r => !r.unlocked);
  const progressToNextReward = nextReward ? Math.min((stars / nextReward.stars) * 100, 100) : 100;

  return (
    <div className="page-content rewards-page">
      <div className="rewards-header">
        <h2>🏆 Your Rewards</h2>
        <p className="header-subtitle">Unlock achievements as you shine!</p>
      </div>

      <div className="rewards-summary glass-card">
        <div className="rewards-summary-item">
          <span className="rewards-summary-emoji">⭐</span>
          <span className="rewards-summary-value">{stars}</span>
          <span className="rewards-summary-label">Stars</span>
        </div>
        <div className="rewards-summary-divider"></div>
        <div className="rewards-summary-item">
          <span className="rewards-summary-emoji">🏅</span>
          <span className="rewards-summary-value">{unlockedCount}</span>
          <span className="rewards-summary-label">Badges</span>
        </div>
      </div>

      {nextReward && (
        <div className="next-reward-card">
          <div className="next-reward-content">
            <div className="next-reward-label">🎯 Next Reward</div>
            <div className="next-reward-name">{nextReward.name}</div>
            <div className="next-reward-stars">{nextReward.stars} stars needed</div>
          </div>
          <div className="next-reward-progress">
            <div className="progress-ring-small" style={{
              background: `conic-gradient(#38B2AC 0deg ${(progressToNextReward / 100) * 360}deg, #E2E8F0 ${(progressToNextReward / 100) * 360}deg 360deg)`
            }}>
              <div className="progress-ring-inner">
                <div className="progress-label">{Math.round(progressToNextReward)}%</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="rewards-grid">
        <div className="rewards-section">
          <h3>⭐ Star Rewards</h3>
          <div className="rewards-list">
            {rewards.filter(r => r.stars > 0).map(reward => (
              <div
                key={reward.id}
                className={`reward-item ${reward.unlocked ? 'unlocked' : 'locked'} ${!calmingMode && reward.unlocked ? 'sparkle' : ''}`}
              >
                <div className={`reward-emoji ${reward.unlocked ? 'bounce' : ''}`}>
                  {reward.emoji}
                </div>
                <div className="reward-info">
                  <div className="reward-name">{reward.name}</div>
                  <div className="reward-requirement">{reward.stars} Stars</div>
                </div>
                {reward.unlocked ? (
                  <div className="reward-status unlocked-badge">✓</div>
                ) : (
                  <div className="reward-progress">{stars}/{reward.stars}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rewards-section">
          <h3>🎯 Achievements</h3>
          <div className="rewards-list">
            {rewards.filter(r => r.stars === 0).map(reward => (
              <div
                key={reward.id}
                className={`reward-item ${reward.unlocked ? 'unlocked' : 'locked'} ${!calmingMode && reward.unlocked ? 'sparkle' : ''}`}
              >
                <div className={`reward-emoji ${reward.unlocked ? 'bounce' : ''}`}>
                  {reward.emoji}
                </div>
                <div className="reward-info">
                  <div className="reward-name">{reward.name}</div>
                  <div className="reward-requirement">
                    {Math.ceil((reward.name === 'Routine Specialist' ? 5 : reward.name === 'Completion Expert' ? 10 : totalRoutines))} Routines
                  </div>
                </div>
                {reward.unlocked ? (
                  <div className="reward-status unlocked-badge">✓</div>
                ) : (
                  <div className="reward-progress">
                    {completedRoutines.length}/{reward.name === 'Routine Specialist' ? 5 : reward.name === 'Completion Expert' ? 10 : totalRoutines}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rewards-stats">
        <div className="stat-box">
          <div className="stat-value">{rewards.filter(r => r.unlocked).length}</div>
          <div className="stat-label">Unlocked</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{8 - rewards.filter(r => r.unlocked).length}</div>
          <div className="stat-label">To Go</div>
        </div>
      </div>
    </div>
  );
}

export default RewardsPage;
