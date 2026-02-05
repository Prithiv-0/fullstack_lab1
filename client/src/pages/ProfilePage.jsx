import React from 'react';

// Child component using Hooks - demonstrates functional component with hooks
function FormInput({ label, type, value, onChange, placeholder, options }) {
    const [isFocused, setIsFocused] = React.useState(false);

    if (type === 'select') {
        return (
            <div className="form-group">
                <label className="form-label">{label}</label>
                <select
                    className={`form-select ${isFocused ? 'focused' : ''}`}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                >
                    <option value="">Select an option...</option>
                    {options.map((opt) => (
                        <option key={opt.id} value={opt.id}>{opt.emoji} {opt.name}</option>
                    ))}
                </select>
            </div>
        );
    }

    return (
        <div className="form-group">
            <label className="form-label">{label}</label>
            <input
                type={type}
                className={`form-input ${isFocused ? 'focused' : ''}`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
            />
        </div>
    );
}

// Main Profile Page as a Class Component
class ProfilePage extends React.Component {
    constructor(props) {
        super(props);

        // Load saved profile from localStorage
        const savedProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');

        this.state = {
            name: savedProfile.name || '',
            age: savedProfile.age || '',
            favoriteRoutine: savedProfile.favoriteRoutine || '',
            isSaved: false,
            saveMessage: ''
        };

        this.handleSave = this.handleSave.bind(this);
    }

    handleNameChange = (value) => {
        this.setState({ name: value, isSaved: false });
    };

    handleAgeChange = (value) => {
        this.setState({ age: value, isSaved: false });
    };

    handleRoutineChange = (value) => {
        this.setState({ favoriteRoutine: value, isSaved: false });
    };

    handleSave() {
        const { name, age, favoriteRoutine } = this.state;
        const profile = { name, age, favoriteRoutine };

        localStorage.setItem('userProfile', JSON.stringify(profile));

        this.setState({
            isSaved: true,
            saveMessage: 'Profile saved successfully! 🎉'
        });

        // Reset save message after 3 seconds
        setTimeout(() => {
            this.setState({ saveMessage: '' });
        }, 3000);
    }

    render() {
        const { routines, stars, completedRoutines } = this.props;
        const { name, age, favoriteRoutine, isSaved, saveMessage } = this.state;

        return (
            <div className="page-content profile-page">
                <div className="profile-header">
                    <h2>👤 My Profile</h2>
                    <p className="header-subtitle">Personalize your experience</p>
                </div>

                {/* Personal Information Form */}
                <div className="profile-card">
                    <div className="profile-card-title">
                        <span>📝</span> Personal Information
                    </div>

                    <FormInput
                        label="Your Name"
                        type="text"
                        value={name}
                        onChange={this.handleNameChange}
                        placeholder="Enter your name..."
                    />

                    <FormInput
                        label="Your Age"
                        type="number"
                        value={age}
                        onChange={this.handleAgeChange}
                        placeholder="Enter your age..."
                    />

                    <FormInput
                        label="Favorite Routine"
                        type="select"
                        value={favoriteRoutine}
                        onChange={this.handleRoutineChange}
                        options={routines}
                    />

                    <button
                        className={`save-button ${isSaved ? 'saved' : ''}`}
                        onClick={this.handleSave}
                    >
                        {isSaved ? '✓ Saved!' : '💾 Save Profile'}
                    </button>

                    {saveMessage && (
                        <p style={{
                            textAlign: 'center',
                            marginTop: '12px',
                            color: 'var(--color-green)',
                            fontWeight: 600
                        }}>
                            {saveMessage}
                        </p>
                    )}
                </div>

                {/* Stats Overview */}
                <div className="profile-card">
                    <div className="profile-card-title">
                        <span>📊</span> Your Statistics
                    </div>

                    <div className="profile-stats">
                        <div className="profile-stat-item">
                            <div className="profile-stat-value">⭐ {stars}</div>
                            <div className="profile-stat-label">Total Stars</div>
                        </div>
                        <div className="profile-stat-item">
                            <div className="profile-stat-value">🏆 {completedRoutines.length}</div>
                            <div className="profile-stat-label">Routines Done</div>
                        </div>
                    </div>
                </div>

                {/* Welcome message if name is set */}
                {name && (
                    <div className="profile-card" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '48px', marginBottom: '12px' }}>👋</div>
                        <h3 style={{ marginBottom: '8px' }}>Welcome, {name}!</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            {age ? `${age} years old • ` : ''}
                            Keep up the great work!
                        </p>
                    </div>
                )}
            </div>
        );
    }
}

export default ProfilePage;
