import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { BIBLE_BOOKS } from '../constants/bibleMetadata';

const ReadingTracker = () => {
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem('bible-progress');
    return saved ? JSON.parse(saved) : {};
  });

  const [expandedBook, setExpandedBook] = useState(null);

  useEffect(() => {
    localStorage.setItem('bible-progress', JSON.stringify(completed));
  }, [completed]);

  const toggleChapter = (book, ch) => {
    const key = `${book}-${ch}`;
    setCompleted(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const totalChapters = BIBLE_BOOKS.reduce((acc, b) => acc + b.chapters, 0);
  const completedCount = Object.values(completed).filter(Boolean).length;
  const progress = Math.round((completedCount / totalChapters) * 100);

  return (
    <div className="tracker-container">
      <div className="progress-header glass-card">
        <div className="progress-info">
          <h2 className="brand-font">Your Progress</h2>
          <p>{completedCount} of {totalChapters} chapters completed</p>
        </div>
        <div className="progress-circle">
          <svg viewBox="0 0 36 36" className="circular-chart">
            <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path className="circle" strokeDasharray={`${progress}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <text x="18" y="20.35" className="percentage">{progress}%</text>
          </svg>
        </div>
      </div>

      <div className="books-list">
        {BIBLE_BOOKS.map(book => {
          const isExpanded = expandedBook === book.english;
          const bookCompletedCount = Object.keys(completed).filter(k => k.startsWith(`${book.english}-`) && completed[k]).length;
          const isFullBookDone = bookCompletedCount === book.chapters;

          return (
            <div key={book.english} className={`book-section ${isExpanded ? 'expanded' : ''}`}>
              <button 
                className="book-header"
                onClick={() => setExpandedBook(isExpanded ? null : book.english)}
              >
                <div className="book-title-group">
                  <span className={`book-name ${isFullBookDone ? 'text-success' : ''}`}>{book.english}</span>
                  <span className="book-progress-pill">{bookCompletedCount}/{book.chapters}</span>
                </div>
                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {isExpanded && (
                <div className="chapters-grid">
                  {Array.from({ length: book.chapters }, (_, i) => i + 1).map(ch => (
                    <button 
                      key={ch}
                      className={`chapter-pill ${completed[`${book.english}-${ch}`] ? 'completed' : ''}`}
                      onClick={() => toggleChapter(book.english, ch)}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx="true">{`
        .tracker-container {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1));
        }
        .progress-circle {
          width: 80px;
        }
        .circular-chart {
          display: block;
          margin: 10px auto;
          max-width: 100%;
          max-height: 250px;
        }
        .circle-bg {
          fill: none;
          stroke: rgba(255, 255, 255, 0.1);
          stroke-width: 3.8;
        }
        .circle {
          fill: none;
          stroke-width: 2.8;
          stroke-linecap: round;
          stroke: var(--accent-primary);
          transition: stroke-dasharray 0.3s ease;
        }
        .percentage {
          fill: white;
          font-family: 'Outfit', sans-serif;
          font-size: 0.5em;
          text-anchor: middle;
          font-weight: 700;
        }
        .books-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .book-section {
          background: var(--card-bg);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          overflow: hidden;
          transition: var(--transition);
        }
        .book-section.expanded {
          border-color: var(--accent-primary);
        }
        .book-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }
        .book-title-group {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .book-name {
          font-weight: 600;
          font-size: 16px;
        }
        .book-progress-pill {
          font-size: 11px;
          background: rgba(255, 255, 255, 0.05);
          padding: 2px 8px;
          border-radius: 20px;
          color: var(--text-muted);
        }
        .text-success {
          color: var(--success);
        }
        .chapters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(45px, 1fr));
          gap: 10px;
          padding: 0 20px 20px 20px;
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .chapter-pill {
          aspect-ratio: 1;
          border: 1px solid var(--glass-border);
          background: rgba(255, 255, 255, 0.03);
          color: white;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          cursor: pointer;
          transition: var(--transition);
        }
        .chapter-pill.completed {
          background: var(--accent-primary);
          border-color: var(--accent-primary);
          color: white;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        }
        .chapter-pill:hover {
          border-color: var(--accent-primary);
        }
      `}</style>
    </div>
  );
};

export default ReadingTracker;

