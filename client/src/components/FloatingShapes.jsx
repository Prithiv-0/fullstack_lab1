import { useEffect, useState } from 'react';

const shapes = ['circle', 'star', 'heart', 'square'];
// Soothing Ocean & Sky colors with low opacity
const colors = [
    'rgba(66, 153, 225, 0.2)',  // Blue
    'rgba(56, 178, 172, 0.2)',  // Teal
    'rgba(72, 187, 120, 0.2)',  // Green
    'rgba(99, 179, 237, 0.2)',  // Light Blue
    'rgba(129, 230, 217, 0.2)'  // Light Teal
];

function FloatingShapes({ calmingMode = false }) {
    const [floatingElements, setFloatingElements] = useState([]);

    useEffect(() => {
        const elements = [];
        const count = calmingMode ? 5 : 10;

        for (let i = 0; i < count; i++) {
            elements.push({
                id: i,
                shape: shapes[Math.floor(Math.random() * shapes.length)],
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 50 + 20,
                left: Math.random() * 100,
                delay: Math.random() * 5,
                duration: Math.random() * 15 + 20 // Slower movement
            });
        }
        setFloatingElements(elements);
    }, [calmingMode]);

    const renderShape = (shape, color, size) => {
        switch (shape) {
            case 'star':
                return (
                    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                );
            case 'heart':
                return (
                    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                );
            case 'square':
                return (
                    <div
                        style={{
                            width: size,
                            height: size,
                            backgroundColor: color,
                            borderRadius: '12px', // Softer corners
                            transform: 'rotate(45deg)'
                        }}
                    />
                );
            default:
                return (
                    <div
                        style={{
                            width: size,
                            height: size,
                            backgroundColor: color,
                            borderRadius: '50%'
                        }}
                    />
                );
        }
    };

    return (
        <div className={`floating-shapes-container ${calmingMode ? 'calming' : ''}`}>
            {floatingElements.map((el) => (
                <div
                    key={el.id}
                    className="floating-shape"
                    style={{
                        left: `${el.left}%`,
                        animationDelay: `${el.delay}s`,
                        animationDuration: `${el.duration}s`
                    }}
                >
                    {renderShape(el.shape, el.color, el.size)}
                </div>
            ))}
        </div>
    );
}

export default FloatingShapes;
