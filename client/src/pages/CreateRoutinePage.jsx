import React from 'react';

// ============= HOOK COMPONENTS =============

// FormField - Reusable input component using hooks
function FormField({ label, type, value, onChange, placeholder, required, icon }) {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);

    const handleBlur = () => {
        setIsFocused(false);
        if (required && !value) {
            setHasError(true);
        } else {
            setHasError(false);
        }
    };

    if (type === 'textarea') {
        return (
            <div className="form-group">
                <label className="form-label">{icon} {label}</label>
                <textarea
                    className={`form-input form-textarea ${isFocused ? 'focused' : ''} ${hasError ? 'error' : ''}`}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    rows={3}
                />
                {hasError && <span className="form-error">This field is required</span>}
            </div>
        );
    }

    return (
        <div className="form-group">
            <label className="form-label">{icon} {label}</label>
            <input
                type={type}
                className={`form-input ${isFocused ? 'focused' : ''} ${hasError ? 'error' : ''}`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={handleBlur}
                placeholder={placeholder}
            />
            {hasError && <span className="form-error">This field is required</span>}
        </div>
    );
}

// EmojiPicker - Emoji selection component using hooks
function EmojiPicker({ value, onChange, label }) {
    const [isOpen, setIsOpen] = React.useState(false);

    const emojis = [
        '🖐️', '🦷', '😊', '💇', '🚿', '✨', '💅', '👕', '🥣', '😴',
        '🌞', '🥗', '📚', '🧼', '💧', '🪥', '🧴', '🧻', '🪞', '👟',
        '🧽', '🛏️', '🪮', '🧵', '✂️', '👔', '🥄', '🍽️', '✏️', '📦'
    ];

    return (
        <div className="form-group emoji-picker-container">
            <label className="form-label">{label}</label>
            <div className="emoji-picker">
                <button
                    type="button"
                    className="emoji-picker-trigger"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="selected-emoji">{value || '🎯'}</span>
                    <span className="picker-arrow">{isOpen ? '▲' : '▼'}</span>
                </button>

                {isOpen && (
                    <div className="emoji-dropdown">
                        {emojis.map((emoji) => (
                            <button
                                key={emoji}
                                type="button"
                                className={`emoji-option ${value === emoji ? 'selected' : ''}`}
                                onClick={() => {
                                    onChange(emoji);
                                    setIsOpen(false);
                                }}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// ColorPicker - Color selection component using hooks
function ColorPicker({ value, onChange, label }) {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const colors = [
        { id: 'teal', value: '#38B2AC', gradient: 'linear-gradient(135deg, #E6FFFA 0%, #B2F5EA 100%)' },
        { id: 'blue', value: '#4299E1', gradient: 'linear-gradient(135deg, #EBF8FF 0%, #BEE3F8 100%)' },
        { id: 'green', value: '#48BB78', gradient: 'linear-gradient(135deg, #F0FFF4 0%, #C6F6D5 100%)' },
        { id: 'yellow', value: '#ECC94B', gradient: 'linear-gradient(135deg, #FFFFF0 0%, #FAF089 100%)' },
        { id: 'orange', value: '#ED8936', gradient: 'linear-gradient(135deg, #FFFAF0 0%, #FEEBC8 100%)' },
        { id: 'pink', value: '#ED64A6', gradient: 'linear-gradient(135deg, #FFF5F7 0%, #FED7E2 100%)' },
        { id: 'purple', value: '#9F7AEA', gradient: 'linear-gradient(135deg, #FAF5FF 0%, #E9D8FD 100%)' },
        { id: 'indigo', value: '#667EEA', gradient: 'linear-gradient(135deg, #EBF4FF 0%, #C3DAFE 100%)' }
    ];

    const selectedColor = colors.find(c => c.value === value) || colors[0];

    return (
        <div className="form-group">
            <label className="form-label">🎨 {label}</label>
            <div className="color-picker">
                <button
                    type="button"
                    className="color-picker-trigger"
                    style={{ background: selectedColor.gradient }}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <span className="color-preview" style={{ background: value }}></span>
                    <span>Select Color</span>
                </button>

                {isExpanded && (
                    <div className="color-dropdown">
                        {colors.map((color) => (
                            <button
                                key={color.id}
                                type="button"
                                className={`color-option ${value === color.value ? 'selected' : ''}`}
                                style={{ background: color.gradient }}
                                onClick={() => {
                                    onChange(color.value);
                                    setIsExpanded(false);
                                }}
                            >
                                <span className="color-dot" style={{ background: color.value }}></span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// StepEditor - Individual step editor using hooks
function StepEditor({ step, index, onUpdate, onRemove, canRemove }) {
    const [isEditing, setIsEditing] = React.useState(true);

    const handleChange = (field, value) => {
        onUpdate(index, { ...step, [field]: value });
    };

    const stepEmojis = ['💧', '💦', '🧼', '🫧', '🧻', '🪥', '🧴', '✨', '👀', '⬆️', '⬇️', '↔️', '🪞', '✂️', '📁', '🚽', '🛏️', '😴', '☀️', '👕', '👖', '👟', '🧢', '🪑', '😋', '🧹', '📚', '🤫', '✅', '📦', '🚰', '🌊'];

    return (
        <div className="step-editor">
            <div className="step-number">{index + 1}</div>

            <div className="step-fields">
                <div className="step-row">
                    <select
                        className="step-emoji-select"
                        value={step.emoji}
                        onChange={(e) => handleChange('emoji', e.target.value)}
                    >
                        {stepEmojis.map(emoji => (
                            <option key={emoji} value={emoji}>{emoji}</option>
                        ))}
                    </select>

                    <input
                        type="text"
                        className="step-text-input"
                        value={step.text}
                        onChange={(e) => handleChange('text', e.target.value)}
                        placeholder="Step instruction (e.g., 'Wet your hands')"
                    />
                </div>

                <div className="step-row">
                    <div className="timer-input-group">
                        <span className="timer-icon">⏱️</span>
                        <input
                            type="number"
                            className="timer-input"
                            value={step.duration}
                            onChange={(e) => handleChange('duration', parseInt(e.target.value) || 0)}
                            min="0"
                            max="300"
                        />
                        <span className="timer-label">seconds (0 = no timer)</span>
                    </div>
                </div>
            </div>

            {canRemove && (
                <button
                    type="button"
                    className="remove-step-btn"
                    onClick={() => onRemove(index)}
                    title="Remove step"
                >
                    ✕
                </button>
            )}
        </div>
    );
}

// ============= CLASS COMPONENT =============

class CreateRoutinePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            routineName: '',
            routineEmoji: '🖐️',
            routineColor: '#38B2AC',
            routineDescription: '',
            steps: [
                { id: 1, text: '', emoji: '💧', duration: 0 }
            ],
            isSaving: false,
            saveMessage: '',
            errors: {}
        };

        this.handleSave = this.handleSave.bind(this);
        this.addStep = this.addStep.bind(this);
        this.removeStep = this.removeStep.bind(this);
        this.updateStep = this.updateStep.bind(this);
    }

    addStep() {
        const { steps } = this.state;
        const newStep = {
            id: steps.length + 1,
            text: '',
            emoji: '💧',
            duration: 0
        };
        this.setState({ steps: [...steps, newStep] });
    }

    removeStep(index) {
        const { steps } = this.state;
        if (steps.length > 1) {
            const newSteps = steps.filter((_, i) => i !== index);
            this.setState({ steps: newSteps });
        }
    }

    updateStep(index, updatedStep) {
        const { steps } = this.state;
        const newSteps = [...steps];
        newSteps[index] = updatedStep;
        this.setState({ steps: newSteps });
    }

    validateForm() {
        const { routineName, steps } = this.state;
        const errors = {};

        if (!routineName.trim()) {
            errors.routineName = 'Routine name is required';
        }

        const emptySteps = steps.filter(s => !s.text.trim());
        if (emptySteps.length > 0) {
            errors.steps = 'All steps must have instructions';
        }

        this.setState({ errors });
        return Object.keys(errors).length === 0;
    }

    handleSave() {
        if (!this.validateForm()) {
            return;
        }

        this.setState({ isSaving: true });

        const { routineName, routineEmoji, routineColor, routineDescription, steps } = this.state;

        // Create the routine object
        const newRoutine = {
            id: `custom-${Date.now()}`,
            name: routineName,
            emoji: routineEmoji,
            color: routineColor,
            description: routineDescription,
            gradient: `linear-gradient(135deg, ${routineColor}20 0%, ${routineColor}40 100%)`,
            character: routineEmoji,
            isCustom: true,
            steps: steps.map((step, index) => ({
                id: index + 1,
                text: step.text,
                emoji: step.emoji,
                duration: step.duration
            }))
        };

        // Save to localStorage
        const existingCustomRoutines = JSON.parse(localStorage.getItem('customRoutines') || '[]');
        existingCustomRoutines.push(newRoutine);
        localStorage.setItem('customRoutines', JSON.stringify(existingCustomRoutines));

        // Call parent callback if provided
        if (this.props.onRoutineCreated) {
            this.props.onRoutineCreated(newRoutine);
        }

        this.setState({
            isSaving: false,
            saveMessage: '🎉 Routine created successfully!',
            routineName: '',
            routineDescription: '',
            steps: [{ id: 1, text: '', emoji: '💧', duration: 0 }]
        });

        setTimeout(() => {
            this.setState({ saveMessage: '' });
        }, 3000);
    }

    render() {
        const {
            routineName, routineEmoji, routineColor, routineDescription,
            steps, isSaving, saveMessage, errors
        } = this.state;

        return (
            <div className="page-content create-routine-page">
                <div className="create-routine-header">
                    <h2>➕ Create Custom Routine</h2>
                    <p className="header-subtitle">Build a personalized hygiene routine for your child</p>
                </div>

                {saveMessage && (
                    <div className="save-success-banner">
                        {saveMessage}
                    </div>
                )}

                {/* Routine Details Card */}
                <div className="create-routine-card">
                    <div className="card-section-title">📋 Routine Details</div>

                    <FormField
                        label="Routine Name"
                        type="text"
                        value={routineName}
                        onChange={(val) => this.setState({ routineName: val })}
                        placeholder="e.g., Morning Bathroom Routine"
                        required
                        icon="📝"
                    />
                    {errors.routineName && <span className="form-error">{errors.routineName}</span>}

                    <div className="form-row">
                        <EmojiPicker
                            label="🎯 Routine Icon"
                            value={routineEmoji}
                            onChange={(val) => this.setState({ routineEmoji: val })}
                        />

                        <ColorPicker
                            label="Theme Color"
                            value={routineColor}
                            onChange={(val) => this.setState({ routineColor: val })}
                        />
                    </div>

                    <FormField
                        label="Description (Optional)"
                        type="textarea"
                        value={routineDescription}
                        onChange={(val) => this.setState({ routineDescription: val })}
                        placeholder="Brief notes for caregivers about this routine..."
                        icon="📄"
                    />
                </div>

                {/* Steps Card */}
                <div className="create-routine-card">
                    <div className="card-section-title">📋 Routine Steps</div>
                    <p className="card-section-desc">Add clear, simple steps. Include timer durations for timed activities.</p>

                    {errors.steps && <span className="form-error">{errors.steps}</span>}

                    <div className="steps-list">
                        {steps.map((step, index) => (
                            <StepEditor
                                key={index}
                                step={step}
                                index={index}
                                onUpdate={this.updateStep}
                                onRemove={this.removeStep}
                                canRemove={steps.length > 1}
                            />
                        ))}
                    </div>

                    <button
                        type="button"
                        className="add-step-btn"
                        onClick={this.addStep}
                    >
                        ➕ Add Another Step
                    </button>
                </div>

                {/* Preview Card */}
                <div className="create-routine-card preview-card">
                    <div className="card-section-title">👁️ Preview</div>
                    <div
                        className="routine-preview"
                        style={{
                            background: `linear-gradient(135deg, ${routineColor}20 0%, ${routineColor}40 100%)`,
                            borderLeft: `4px solid ${routineColor}`
                        }}
                    >
                        <span className="preview-emoji">{routineEmoji}</span>
                        <div className="preview-info">
                            <div className="preview-name">{routineName || 'Routine Name'}</div>
                            <div className="preview-steps">{steps.length} step{steps.length !== 1 ? 's' : ''}</div>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <button
                    className={`save-routine-btn ${isSaving ? 'saving' : ''}`}
                    onClick={this.handleSave}
                    disabled={isSaving}
                >
                    {isSaving ? '💾 Saving...' : '✅ Create Routine'}
                </button>
            </div>
        );
    }
}

export default CreateRoutinePage;
