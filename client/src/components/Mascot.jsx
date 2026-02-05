const mascots = {
    star: {
        normal: '⭐',
        happy: '🌟',
        cheering: '✨',
        sleeping: '💫'
    },
    bear: {
        normal: '🧸',
        happy: '🐻',
        cheering: '🎉',
        sleeping: '😴'
    },
    bunny: {
        normal: '🐰',
        happy: '🐇',
        cheering: '🎊',
        sleeping: '💤'
    }
};

const messages = {
    welcome: [
        "Hey there, superstar! Ready for fun?",
        "Yay! Let's do something awesome!",
        "Hi friend! I'm so happy to see you!",
        "Welcome back, champion!"
    ],
    encouragement: [
        "You're doing amazing!",
        "Keep going, you've got this!",
        "Wow, you're a superstar!",
        "That's fantastic work!",
        "I'm so proud of you!",
        "You're incredible!"
    ],
    completion: [
        "YAY! You did it!",
        "Amazing job, superstar!",
        "High five! That was awesome!",
        "Woohoo! You're the best!"
    ],
    stepDone: [
        "Great step!",
        "Awesome!",
        "Perfect!",
        "Way to go!"
    ]
};

function Mascot({ theme = 'star', mood = 'normal', message = null, showMessage = true, size = 'medium' }) {
    const mascot = mascots[theme] || mascots.star;
    const emoji = mascot[mood] || mascot.normal;

    const getRandomMessage = (type) => {
        const msgArray = messages[type];
        return msgArray[Math.floor(Math.random() * msgArray.length)];
    };

    const displayMessage = message || (showMessage ? getRandomMessage('welcome') : null);

    const sizeMap = {
        small: { emoji: '32px', container: '60px' },
        medium: { emoji: '48px', container: '80px' },
        large: { emoji: '64px', container: '100px' }
    };

    const sizeStyles = sizeMap[size] || sizeMap.medium;

    return (
        <div className={`mascot-container mascot-${size}`}>
            <div
                className={`mascot-character mascot-${mood}`}
                style={{ fontSize: sizeStyles.emoji }}
            >
                {emoji}
            </div>
            {displayMessage && (
                <div className="mascot-speech-bubble">
                    <span>{displayMessage}</span>
                </div>
            )}
        </div>
    );
}

// Export messages for use in other components
export { messages };
export default Mascot;
