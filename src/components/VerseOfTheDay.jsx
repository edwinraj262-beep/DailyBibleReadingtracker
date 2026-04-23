import React, { useState } from 'react';
import { Heart, Share2, BookOpen, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VerseOfTheDay = ({ toggleFavorite, favorites }) => {
  const [showStudy, setShowStudy] = useState(false);

  // Mock data for "Verse of the Day"
  const votd = {
    ref: "Psalm 23:1",
    english: "The LORD is my shepherd; I shall not want.",
    tamil: "கர்த்தர் என் மேய்ப்பராயிருக்கிறார்; நான் தாழ்ச்சியடையேன்.",
    wordStudy: [
      {
        word: "Shepherd",
        original: "רָעָה (Ra'ah)",
        meaning: "To tend a flock, pasture, or guide. It implies not just leading but providing protection and nourishment.",
        origin: "Hebrew"
      },
      {
        word: "Want",
        original: "חָסֵר (Chacer)",
        meaning: "To lack, decrease, or be empty. In this context, it means 'to be in need of nothing essential'.",
        origin: "Hebrew"
      }
    ]
  };

  const isFavorited = favorites.find(f => f.ref === votd.ref);

  return (
    <div className="votd-container">
      <div className="section-header">
        <h2 className="brand-font">Verse of the Day</h2>
        <span className="date">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
      </div>

      <motion.div 
        className="glass-card main-verse-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="verse-content">
          <p className="verse-text-en">"{votd.english}"</p>
          <p className="verse-text-ta tamil-font">{votd.tamil}</p>
          <p className="verse-ref">{votd.ref}</p>
        </div>

        <div className="card-actions">
          <button 
            className={`action-btn ${isFavorited ? 'active' : ''}`}
            onClick={() => toggleFavorite(votd)}
          >
            <Heart size={20} fill={isFavorited ? "currentColor" : "none"} />
          </button>
          <button className="action-btn">
            <Share2 size={20} />
          </button>
          <button 
            className="btn-primary study-toggle"
            onClick={() => setShowStudy(!showStudy)}
          >
            <Info size={18} />
            {showStudy ? 'Hide Study' : 'Word Study'}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showStudy && (
          <motion.div 
            className="word-study-section"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <h3 className="section-subtitle">Detailed Word Study</h3>
            <div className="study-grid">
              {votd.wordStudy.map((item, idx) => (
                <div key={idx} className="study-card">
                  <div className="study-header">
                    <span className="original-lang">{item.origin}</span>
                    <h4>{item.word}</h4>
                    <span className="original-word">{item.original}</span>
                  </div>
                  <p className="meaning">{item.meaning}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx="true">{`
        .votd-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .date {
          color: var(--text-muted);
          font-size: 14px;
        }
        .main-verse-card {
          position: relative;
          overflow: hidden;
        }
        .main-verse-card::before {
          content: '"';
          position: absolute;
          top: -20px;
          left: 10px;
          font-size: 120px;
          color: rgba(255, 255, 255, 0.03);
          font-family: serif;
        }
        .verse-content {
          margin-bottom: 30px;
          text-align: center;
        }
        .verse-text-en {
          font-size: 22px;
          font-weight: 500;
          margin-bottom: 15px;
          line-height: 1.4;
        }
        .verse-text-ta {
          font-size: 18px;
          color: var(--text-muted);
          margin-bottom: 15px;
        }
        .verse-ref {
          font-weight: 700;
          color: var(--accent-primary);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .card-actions {
          display: flex;
          gap: 15px;
          align-items: center;
        }
        .action-btn {
          background: var(--card-bg);
          border: 1px solid var(--glass-border);
          color: white;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
        }
        .action-btn.active {
          color: var(--accent-secondary);
          border-color: var(--accent-secondary);
        }
        .study-toggle {
          margin-left: auto;
        }
        .word-study-section {
          margin-top: 20px;
        }
        .section-subtitle {
          margin-bottom: 15px;
          font-size: 18px;
          color: var(--text-muted);
        }
        .study-grid {
          display: grid;
          gap: 15px;
        }
        .study-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          padding: 20px;
          border-radius: 16px;
        }
        .study-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }
        .original-lang {
          font-size: 10px;
          background: var(--accent-primary);
          padding: 2px 6px;
          border-radius: 4px;
          text-transform: uppercase;
        }
        .original-word {
          margin-left: auto;
          color: var(--accent-secondary);
          font-style: italic;
        }
        .meaning {
          font-size: 14px;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
};

export default VerseOfTheDay;
