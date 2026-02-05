import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ActivityPage from './pages/ActivityPage';
import ProgressPage from './pages/ProgressPage';
import SettingsPage from './pages/SettingsPage';
import RewardsPage from './pages/RewardsPage';
import DashboardPage from './pages/DashboardPage';
import CreateRoutinePage from './pages/CreateRoutinePage';
import FloatingShapes from './components/FloatingShapes';

const ROUTINES = [
  {
    id: 'handwash',
    name: 'Wash Your Hands',
    emoji: '🖐️',
    color: '#38B2AC',
    gradient: 'linear-gradient(135deg, #E6FFFA 0%, #B2F5EA 100%)',
    character: '🧼',
    steps: [
      { id: 1, text: 'Turn on the water', emoji: '💧', duration: 0 },
      { id: 2, text: 'Wet your hands', emoji: '💦', duration: 0 },
      { id: 3, text: 'Put soap on hands', emoji: '🧼', duration: 0 },
      { id: 4, text: 'Scrub for 20 seconds', emoji: '🫧', duration: 20 },
      { id: 5, text: 'Rinse with water', emoji: '💧', duration: 0 },
      { id: 6, text: 'Dry with towel', emoji: '🧻', duration: 0 }
    ]
  },
  {
    id: 'brushteeth',
    name: 'Brush Your Teeth',
    emoji: '🦷',
    color: '#4299E1',
    gradient: 'linear-gradient(135deg, #EBF8FF 0%, #BEE3F8 100%)',
    character: '🪥',
    steps: [
      { id: 1, text: 'Get your toothbrush', emoji: '🪥', duration: 0 },
      { id: 2, text: 'Put toothpaste on brush', emoji: '🧴', duration: 0 },
      { id: 3, text: 'Brush top teeth', emoji: '🦷', duration: 15 },
      { id: 4, text: 'Brush bottom teeth', emoji: '🦷', duration: 15 },
      { id: 5, text: 'Rinse your mouth', emoji: '💧', duration: 0 },
      { id: 6, text: 'Rinse your brush', emoji: '🚰', duration: 0 }
    ]
  },
  {
    id: 'washface',
    name: 'Wash Your Face',
    emoji: '😊',
    color: '#ECC94B',
    gradient: 'linear-gradient(135deg, #FFFFF0 0%, #FAF089 100%)',
    character: '🧽',
    steps: [
      { id: 1, text: 'Wet your face', emoji: '💦', duration: 0 },
      { id: 2, text: 'Put soap on hands', emoji: '🧼', duration: 0 },
      { id: 3, text: 'Rub face gently', emoji: '✨', duration: 10 },
      { id: 4, text: 'Rinse with water', emoji: '💧', duration: 0 },
      { id: 5, text: 'Pat dry with towel', emoji: '🧻', duration: 0 }
    ]
  },
  {
    id: 'combhair',
    name: 'Comb Your Hair',
    emoji: '💇',
    color: '#48BB78',
    gradient: 'linear-gradient(135deg, #F0FFF4 0%, #C6F6D5 100%)',
    character: '🪮',
    steps: [
      { id: 1, text: 'Get your comb', emoji: '🪮', duration: 0 },
      { id: 2, text: 'Start at the top', emoji: '⬆️', duration: 0 },
      { id: 3, text: 'Comb down slowly', emoji: '⬇️', duration: 10 },
      { id: 4, text: 'Do the sides too', emoji: '↔️', duration: 10 },
      { id: 5, text: 'Check in mirror', emoji: '🪞', duration: 0 }
    ]
  },
  {
    id: 'shower',
    name: 'Take a Shower',
    emoji: '🚿',
    color: '#319795',
    gradient: 'linear-gradient(135deg, #E6FFFA 0%, #81E6D9 100%)',
    character: '💦',
    steps: [
      { id: 1, text: 'Get your towel ready', emoji: '🧼', duration: 0 },
      { id: 2, text: 'Turn on shower water', emoji: '💧', duration: 0 },
      { id: 3, text: 'Wet your entire body', emoji: '🌊', duration: 0 },
      { id: 4, text: 'Apply body soap', emoji: '🧼', duration: 0 },
      { id: 5, text: 'Scrub your body', emoji: '🫧', duration: 30 },
      { id: 6, text: 'Rinse off soap', emoji: '💦', duration: 0 },
      { id: 7, text: 'Wash your hair', emoji: '🧴', duration: 20 },
      { id: 8, text: 'Rinse your hair', emoji: '💧', duration: 0 }
    ]
  },
  {
    id: 'floss',
    name: 'Floss Your Teeth',
    emoji: '✨',
    color: '#ED64A6',
    gradient: 'linear-gradient(135deg, #FFF5F7 0%, #FED7E2 100%)',
    character: '🧵',
    steps: [
      { id: 1, text: 'Get dental floss', emoji: '🧵', duration: 0 },
      { id: 2, text: 'Cut about 18 inches', emoji: '✂️', duration: 0 },
      { id: 3, text: 'Floss upper teeth', emoji: '😁', duration: 15 },
      { id: 4, text: 'Floss lower teeth', emoji: '😁', duration: 15 },
      { id: 5, text: 'Rinse your mouth', emoji: '💧', duration: 0 }
    ]
  },
  {
    id: 'nails',
    name: 'Trim Your Nails',
    emoji: '💅',
    color: '#9F7AEA',
    gradient: 'linear-gradient(135deg, #FAF5FF 0%, #E9D8FD 100%)',
    character: '✂️',
    steps: [
      { id: 1, text: 'Get nail clippers', emoji: '✂️', duration: 0 },
      { id: 2, text: 'Look at nail length', emoji: '👀', duration: 0 },
      { id: 3, text: 'Trim nails carefully', emoji: '✂️', duration: 20 },
      { id: 4, text: 'File edges smooth', emoji: '📁', duration: 10 },
      { id: 5, text: 'Wash your hands', emoji: '💧', duration: 0 }
    ]
  },
  {
    id: 'clothes',
    name: 'Change Your Clothes',
    emoji: '👕',
    color: '#63B3ED',
    gradient: 'linear-gradient(135deg, #EBF8FF 0%, #90CDF4 100%)',
    character: '👔',
    steps: [
      { id: 1, text: 'Pick clean clothes', emoji: '👕', duration: 0 },
      { id: 2, text: 'Remove old clothes', emoji: '👖', duration: 0 },
      { id: 3, text: 'Put on new shirt', emoji: '👔', duration: 0 },
      { id: 4, text: 'Put on new pants', emoji: '👖', duration: 0 },
      { id: 5, text: 'Check in mirror', emoji: '🪞', duration: 0 }
    ]
  },
  {
    id: 'breakfast',
    name: 'Eat Your Breakfast',
    emoji: '🥣',
    color: '#ED8936',
    gradient: 'linear-gradient(135deg, #FFFAF0 0%, #FEEBC8 100%)',
    character: '🥄',
    steps: [
      { id: 1, text: 'Wash your hands', emoji: '💧', duration: 0 },
      { id: 2, text: 'Get your food', emoji: '🥘', duration: 0 },
      { id: 3, text: 'Sit down at table', emoji: '🪑', duration: 0 },
      { id: 4, text: 'Eat your breakfast slowly', emoji: '😋', duration: 30 },
      { id: 5, text: 'Drink your water', emoji: '💧', duration: 0 },
      { id: 6, text: 'Clean up your plate', emoji: '🧹', duration: 0 }
    ]
  },
  {
    id: 'sleep',
    name: 'Get Ready for Bed',
    emoji: '😴',
    color: '#667EEA',
    gradient: 'linear-gradient(135deg, #EBF4FF 0%, #C3DAFE 100%)',
    character: '🛏️',
    steps: [
      { id: 1, text: 'Put on pajamas', emoji: '🛏️', duration: 0 },
      { id: 2, text: 'Brush your teeth', emoji: '🪥', duration: 0 },
      { id: 3, text: 'Use the bathroom', emoji: '🚽', duration: 0 },
      { id: 4, text: 'Get into bed', emoji: '🛏️', duration: 0 },
      { id: 5, text: 'Relax and sleep', emoji: '😴', duration: 0 }
    ]
  },
  {
    id: 'outdoor',
    name: 'Prepare for Outdoors',
    emoji: '🌞',
    color: '#F6AD55',
    gradient: 'linear-gradient(135deg, #FFFAF0 0%, #FEEBC8 100%)',
    character: '☀️',
    steps: [
      { id: 1, text: 'Apply sunscreen', emoji: '☀️', duration: 0 },
      { id: 2, text: 'Put on your clothes', emoji: '👕', duration: 0 },
      { id: 3, text: 'Put on your shoes', emoji: '👟', duration: 0 },
      { id: 4, text: 'Get a hat or cap', emoji: '🧢', duration: 0 },
      { id: 5, text: 'Bring water bottle', emoji: '💧', duration: 0 }
    ]
  },
  {
    id: 'lunch',
    name: 'Eat Your Lunch',
    emoji: '🥗',
    color: '#68D391',
    gradient: 'linear-gradient(135deg, #F0FFF4 0%, #9AE6B4 100%)',
    character: '🍽️',
    steps: [
      { id: 1, text: 'Wash your hands', emoji: '💧', duration: 0 },
      { id: 2, text: 'Get your lunch ready', emoji: '🥘', duration: 0 },
      { id: 3, text: 'Sit down at table', emoji: '🪑', duration: 0 },
      { id: 4, text: 'Eat your lunch slowly', emoji: '😋', duration: 30 },
      { id: 5, text: 'Drink your water', emoji: '💧', duration: 0 },
      { id: 6, text: 'Clean your area', emoji: '🧹', duration: 0 }
    ]
  },
  {
    id: 'homework',
    name: 'Do Your Homework',
    emoji: '📚',
    color: '#4299E1',
    gradient: 'linear-gradient(135deg, #EBF8FF 0%, #90CDF4 100%)',
    character: '✏️',
    steps: [
      { id: 1, text: 'Gather your materials', emoji: '📚', duration: 0 },
      { id: 2, text: 'Find a quiet space', emoji: '🤫', duration: 0 },
      { id: 3, text: 'Review the assignment', emoji: '👀', duration: 0 },
      { id: 4, text: 'Work on your homework', emoji: '✏️', duration: 45 },
      { id: 5, text: 'Review your work', emoji: '✅', duration: 0 },
      { id: 6, text: 'Pack everything away', emoji: '📦', duration: 0 }
    ]
  }
];

// Wrapper component to provide navigation capability
function ActivityPageWrapper({ routine, onComplete, onBack, mascotTheme, calmingMode }) {
  const navigate = useNavigate();

  const handleComplete = (starsEarned) => {
    onComplete(starsEarned);
    navigate('/');
  };

  const handleBack = () => {
    onBack();
    navigate('/');
  };

  if (!routine) {
    navigate('/');
    return null;
  }

  return (
    <ActivityPage
      routine={routine}
      onComplete={handleComplete}
      onBack={handleBack}
      mascotTheme={mascotTheme}
      calmingMode={calmingMode}
    />
  );
}

function AppContent() {
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [stars, setStars] = useState(parseInt(localStorage.getItem('stars') || '0'));
  const [completedToday, setCompletedToday] = useState(JSON.parse(localStorage.getItem('completedToday') || '[]'));
  const [completedRoutines, setCompletedRoutines] = useState(JSON.parse(localStorage.getItem('completedRoutines') || '[]'));
  const [customRoutines, setCustomRoutines] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(JSON.parse(localStorage.getItem('soundEnabled') || 'true'));
  const [animationEnabled, setAnimationEnabled] = useState(JSON.parse(localStorage.getItem('animationEnabled') || 'true'));
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem('darkMode') || 'false'));
  const [calmingMode, setCalmingMode] = useState(JSON.parse(localStorage.getItem('calmingMode') || 'false'));
  const [mascotTheme, setMascotTheme] = useState(localStorage.getItem('mascotTheme') || 'star');

  const navigate = useNavigate();

  // Load custom routines from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('customRoutines') || '[]');
    setCustomRoutines(saved);
  }, []);

  // Combine built-in and custom routines
  const allRoutines = [...ROUTINES, ...customRoutines];

  const handleRoutineCreated = (newRoutine) => {
    setCustomRoutines(prev => [...prev, newRoutine]);
  };

  const handleDeleteRoutine = (routineId) => {
    if (window.confirm('Are you sure you want to delete this routine?')) {
      const updatedRoutines = customRoutines.filter(r => r.id !== routineId);
      setCustomRoutines(updatedRoutines);
      localStorage.setItem('customRoutines', JSON.stringify(updatedRoutines));
    }
  };

  const handleSelectRoutine = (routine) => {
    setSelectedRoutine(routine);
    navigate('/activity');
  };

  const handleActivityComplete = (starsEarned = 1) => {
    const newStars = stars + starsEarned;
    const newCompleted = [...completedToday, selectedRoutine.id];
    const allCompleted = [...completedRoutines, selectedRoutine.id];

    setStars(newStars);
    setCompletedToday(newCompleted);
    setCompletedRoutines(allCompleted);

    localStorage.setItem('stars', newStars.toString());
    localStorage.setItem('completedToday', JSON.stringify(newCompleted));
    localStorage.setItem('completedRoutines', JSON.stringify(allCompleted));

    setSelectedRoutine(null);
  };

  const handleActivityBack = () => {
    setSelectedRoutine(null);
  };

  const appClasses = [
    'app-container',
    darkMode ? 'dark-mode' : '',
    calmingMode ? 'calming-mode' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={appClasses}>
      {!calmingMode && animationEnabled && <FloatingShapes calmingMode={calmingMode} />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HomePage
                routines={allRoutines}
                onSelectRoutine={handleSelectRoutine}
                onDeleteRoutine={handleDeleteRoutine}
                stars={stars}
                completedToday={completedToday}
                mascotTheme={mascotTheme}
                calmingMode={calmingMode}
              />
              <Link to="/create-routine" className="create-routine-fab" title="Create Custom Routine">
                ➕
              </Link>
            </>
          }
        />
        <Route
          path="/activity"
          element={
            <ActivityPageWrapper
              routine={selectedRoutine}
              onComplete={handleActivityComplete}
              onBack={handleActivityBack}
              mascotTheme={mascotTheme}
              calmingMode={calmingMode}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <DashboardPage
              stars={stars}
              completedToday={completedToday}
              completedRoutines={completedRoutines}
              routines={ROUTINES}
            />
          }
        />
        <Route
          path="/create-routine"
          element={
            <CreateRoutinePage
              routines={allRoutines}
              onRoutineCreated={handleRoutineCreated}
            />
          }
        />
        <Route
          path="/progress"
          element={
            <ProgressPage
              stars={stars}
              completedRoutines={completedRoutines}
              totalRoutines={ROUTINES.length}
              routines={ROUTINES}
            />
          }
        />
        <Route
          path="/rewards"
          element={
            <RewardsPage
              stars={stars}
              completedRoutines={completedRoutines}
              totalRoutines={ROUTINES.length}
              calmingMode={calmingMode}
            />
          }
        />
        <Route
          path="/settings"
          element={
            <SettingsPage
              soundEnabled={soundEnabled}
              animationEnabled={animationEnabled}
              darkMode={darkMode}
              calmingMode={calmingMode}
              mascotTheme={mascotTheme}
              onSoundToggle={() => {
                const newValue = !soundEnabled;
                setSoundEnabled(newValue);
                localStorage.setItem('soundEnabled', JSON.stringify(newValue));
              }}
              onAnimationToggle={() => {
                const newValue = !animationEnabled;
                setAnimationEnabled(newValue);
                localStorage.setItem('animationEnabled', JSON.stringify(newValue));
              }}
              onDarkModeToggle={() => {
                const newValue = !darkMode;
                setDarkMode(newValue);
                localStorage.setItem('darkMode', JSON.stringify(newValue));
              }}
              onCalmingModeToggle={() => {
                const newValue = !calmingMode;
                setCalmingMode(newValue);
                localStorage.setItem('calmingMode', JSON.stringify(newValue));
              }}
              onMascotThemeChange={(theme) => {
                setMascotTheme(theme);
                localStorage.setItem('mascotTheme', theme);
              }}
            />
          }
        />
      </Routes>

      <Navigation />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
