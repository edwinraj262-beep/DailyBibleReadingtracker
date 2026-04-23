import React, { useState, useEffect } from 'react';
import { Home, BookOpen, CheckCircle, Heart, Search } from 'lucide-react';
import VerseOfTheDay from './components/VerseOfTheDay';
import BibleReader from './components/BibleReader';
import ReadingTracker from './components/ReadingTracker';
import Favorites from './components/Favorites';
import DailyReading from './components/DailyReading';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [bibleState, setBibleState] = useState({ book: 'John', chapter: 1 });
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('bible-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bible-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (verse) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.ref === verse.ref);
      if (exists) return prev.filter(f => f.ref !== verse.ref);
      return [...prev, verse];
    });
  };

  const navigateToBible = (book, chapter) => {
    setBibleState({ book, chapter });
    setActiveTab('bible');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <VerseOfTheDay toggleFavorite={toggleFavorite} favorites={favorites} />
            <DailyReading onNavigateToBible={navigateToBible} />
          </>
        );
      case 'bible':
        return (
          <BibleReader 
            toggleFavorite={toggleFavorite} 
            favorites={favorites} 
            initialBook={bibleState.book}
            initialChapter={bibleState.chapter}
          />
        );
      case 'track':
        return <ReadingTracker />;
      case 'favorites':
        return <Favorites favorites={favorites} toggleFavorite={toggleFavorite} />;
      default:
        return <VerseOfTheDay />;
    }
  };

  return (
    <div className="app-container">
      <header className="mobile-header">
        <h1 className="brand-font text-gradient">Daily Bread</h1>
      </header>

      <nav className="bottom-nav">
        <button 
          className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <Home size={24} />
          <span>Home</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'bible' ? 'active' : ''}`}
          onClick={() => setActiveTab('bible')}
        >
          <BookOpen size={24} />
          <span>Bible</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'track' ? 'active' : ''}`}
          onClick={() => setActiveTab('track')}
        >
          <CheckCircle size={24} />
          <span>Track</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          <Heart size={24} />
          <span>Saved</span>
        </button>
      </nav>

      <main className="content-area">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
