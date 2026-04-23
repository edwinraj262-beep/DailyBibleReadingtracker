import React, { useState, useEffect } from 'react';
import { Languages, Heart, ChevronDown, BookOpen } from 'lucide-react';
import BibleSelector from './BibleSelector';
import VerseStudyOverlay from './VerseStudyOverlay';
import { BIBLE_BOOKS } from '../constants/bibleMetadata';

let bibleCache = null;

const BibleReader = ({ toggleFavorite, favorites, initialBook = 'John', initialChapter = 1 }) => {
  const [lang, setLang] = useState('en');
  const [book, setBook] = useState(initialBook);
  const [chapter, setChapter] = useState(initialChapter);
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [selectedVerse, setSelectedVerse] = useState(null);

  useEffect(() => {
    setBook(initialBook);
    setChapter(initialChapter);
  }, [initialBook, initialChapter]);

  const fetchVerses = async () => {
    setLoading(true);
    try {
      if (lang === 'en') {
        const res = await fetch(`https://bible-api.com/${book}+${chapter}`);
        const data = await res.json();
        setVerses(data.verses);
      } else {
        let data = bibleCache;
        if (!data) {
          const res = await fetch('https://raw.githubusercontent.com/godlytalias/Bible-Database/master/Tamil/bible.json');
          data = await res.json();
          bibleCache = data;
        }

        const bookIndex = BIBLE_BOOKS.findIndex(b => b.english === book);
        if (bookIndex !== -1) {
          const bookData = data.Book[bookIndex];
          const chapterData = bookData.Chapter[chapter - 1];
          if (chapterData) {
            const formattedVerses = chapterData.Verse.map((v, idx) => ({
              verse: idx + 1,
              text: v.Verse
            }));
            setVerses(formattedVerses);
          }
        }
      }
    } catch (err) {
      console.error('Error fetching Tamil Bible:', err);
      setVerses([{ verse: 1, text: "Error loading Tamil Bible. Please check your internet connection." }]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVerses();
  }, [lang, book, chapter]);

  const handleSelect = (selectedBook, selectedChapter) => {
    setBook(selectedBook);
    setChapter(selectedChapter);
  };

  const isFavorited = (verseNum) => {
    const ref = `${book} ${chapter}:${verseNum}`;
    return favorites.find(f => f.ref === ref);
  };

  const currentBookData = BIBLE_BOOKS.find(b => b.english === book);

  return (
    <div className="reader-container">
      <div className="reader-controls glass-card">
        <button className="book-nav-btn" onClick={() => setIsSelectorOpen(true)}>
          <span className="current-book">
            {lang === 'en' ? book : currentBookData?.tamil} {chapter}
          </span>
          <ChevronDown size={18} />
        </button>

        <div className="header-actions">
          <button className="lang-toggle" onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}>
            <Languages size={18} />
            {lang === 'en' ? 'English' : 'தமிழ்'}
          </button>
        </div>
      </div>

      <BibleSelector
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        onSelect={handleSelect}
        currentBook={book}
        currentChapter={chapter}
        lang={lang}
      />

      <div className="verses-list">
        {loading ? (
          <div className="loading">Fetching Scripture...</div>
        ) : (
          verses.map((v, idx) => (
            <div
              key={idx}
              className="verse-item clickable"
              onClick={() => setSelectedVerse(v)}
            >
              <span className="v-num">{v.verse}</span>
              <p className={`v-text ${lang === 'ta' ? 'tamil-font' : ''}`}>{v.text}</p>
              <button
                className={`v-fav ${isFavorited(v.verse) ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent opening study overlay
                  toggleFavorite({
                    ref: `${book} ${chapter}:${v.verse}`,
                    english: lang === 'en' ? v.text : '...',
                    tamil: lang === 'ta' ? v.text : '...'
                  });
                }}
              >
                <Heart size={14} fill={isFavorited(v.verse) ? "currentColor" : "none"} />
              </button>
            </div>
          ))
        )}
      </div>

      <VerseStudyOverlay
        isOpen={!!selectedVerse}
        onClose={() => setSelectedVerse(null)}
        verse={selectedVerse}
        book={book}
        chapter={chapter}
      />

      <style jsx="true">{`
        .reader-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .reader-controls {
          display: flex;
          justify-content: space-between;
          padding: 12px 15px;
          border-radius: 16px;
          align-items: center;
        }
        .book-nav-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          color: white;
          padding: 10px 20px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: var(--transition);
        }
        .book-nav-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--accent-primary);
        }
        .lang-toggle {
          background: var(--accent-primary);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          cursor: pointer;
        }
        .verses-list {
          padding-bottom: 20px;
        }
        .verse-item {
          display: grid;
          grid-template-columns: 35px 1fr 40px;
          gap: 15px;
          padding: 20px 0;
          border-bottom: 1px solid var(--glass-border);
          align-items: start;
          transition: var(--transition);
        }
        .verse-item.clickable {
          cursor: pointer;
        }
        .verse-item.clickable:hover {
          background: rgba(139, 92, 246, 0.05);
          padding-left: 10px;
          padding-right: 10px;
          border-radius: 8px;
        }
        .v-num {
          font-weight: 700;
          color: var(--accent-primary);
          font-size: 14px;
          margin-top: 4px;
        }
        .v-text {
          font-size: 18px;
          line-height: 1.6;
        }
        .tamil-font {
          font-family: 'Noto Sans Tamil', sans-serif;
          line-height: 1.8;
          font-size: 18px;
        }
        .v-fav {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 5px;
        }
        .v-fav.active {
          color: var(--accent-secondary);
        }
        .loading {
          text-align: center;
          padding: 60px;
          color: var(--text-muted);
          font-style: italic;
        }
        .study-panel {
          margin-bottom: 20px;
          padding: 20px;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(0, 0, 0, 0.2));
          border: 1px solid rgba(139, 92, 246, 0.3);
        }
        .study-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: 10px;
        }
        .study-header h3 {
          font-family: 'Outfit', sans-serif;
          font-size: 18px;
        }
        .commentary-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }
        .c-info h4 {
          color: var(--accent-primary);
          margin-bottom: 5px;
        }
        .c-info p {
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.4;
        }
        .study-link-btn {
          background: var(--accent-primary);
          color: white;
          padding: 10px 20px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          white-space: nowrap;
          transition: var(--transition);
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
        }
        .study-link-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(139, 92, 246, 0.5);
        }
        @media (max-width: 600px) {
          .commentary-card {
            flex-direction: column;
            align-items: flex-start;
          }
          .study-link-btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default BibleReader;

