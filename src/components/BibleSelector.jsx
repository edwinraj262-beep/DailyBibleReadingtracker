import React, { useState } from 'react';
import { X, Book, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BIBLE_BOOKS } from '../constants/bibleMetadata';

const BibleSelector = ({ isOpen, onClose, onSelect, currentBook, currentChapter, lang }) => {
  const [view, setView] = useState('books'); // 'books' or 'chapters'
  const [selectedBook, setSelectedBook] = useState(BIBLE_BOOKS.find(b => b.english === currentBook) || BIBLE_BOOKS[0]);

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setView('chapters');
  };

  const handleChapterSelect = (ch) => {
    onSelect(selectedBook.english, ch);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="selector-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="selector-panel glass-card"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div className="selector-header">
              <div className="tabs">
                <button 
                  className={`tab-btn ${view === 'books' ? 'active' : ''}`}
                  onClick={() => setView('books')}
                >
                  <Book size={18} />
                  {lang === 'en' ? 'Books' : 'புத்தகங்கள்'}
                </button>
                <button 
                  className={`tab-btn ${view === 'chapters' ? 'active' : ''}`}
                  onClick={() => setView('chapters')}
                >
                  <Hash size={18} />
                  {lang === 'en' ? 'Chapters' : 'அதிகாரங்கள்'}
                </button>
              </div>
              <button className="close-btn" onClick={onClose}>
                <X size={24} />
              </button>
            </div>

            <div className="selector-content">
              {view === 'books' ? (
                <div className="books-grid">
                  {BIBLE_BOOKS.map((book, idx) => (
                    <button 
                      key={idx}
                      className={`grid-item book-item ${selectedBook.english === book.english ? 'active' : ''}`}
                      onClick={() => handleBookSelect(book)}
                    >
                      <span className="book-en">{book.english}</span>
                      <span className="book-ta tamil-font">{book.tamil}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="chapters-grid">
                  <div className="selected-book-title">
                    {lang === 'en' ? selectedBook.english : selectedBook.tamil}
                  </div>
                  <div className="ch-grid">
                    {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map(ch => (
                      <button 
                        key={ch}
                        className={`grid-item ch-item ${currentChapter === ch && selectedBook.english === currentBook ? 'active' : ''}`}
                        onClick={() => handleChapterSelect(ch)}
                      >
                        {ch}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <style jsx="true">{`
            .selector-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(0, 0, 0, 0.8);
              backdrop-filter: blur(8px);
              z-index: 2000;
              display: flex;
              justify-content: center;
              align-items: flex-end;
            }
            .selector-panel {
              width: 100%;
              max-width: 600px;
              height: 80vh;
              border-radius: 32px 32px 0 0;
              display: flex;
              flex-direction: column;
              padding: 30px;
              border-bottom: none;
            }
            .selector-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 25px;
            }
            .tabs {
              display: flex;
              gap: 15px;
              background: rgba(255, 255, 255, 0.05);
              padding: 5px;
              border-radius: 12px;
            }
            .tab-btn {
              background: none;
              border: none;
              color: var(--text-muted);
              padding: 8px 16px;
              border-radius: 8px;
              display: flex;
              align-items: center;
              gap: 8px;
              font-weight: 600;
              cursor: pointer;
              transition: var(--transition);
            }
            .tab-btn.active {
              background: var(--accent-primary);
              color: white;
            }
            .close-btn {
              background: none;
              border: none;
              color: var(--text-muted);
              cursor: pointer;
            }
            .selector-content {
              flex: 1;
              overflow-y: auto;
              padding-right: 5px;
            }
            .books-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 12px;
            }
            .grid-item {
              background: rgba(255, 255, 255, 0.03);
              border: 1px solid var(--glass-border);
              color: white;
              padding: 15px;
              border-radius: 16px;
              cursor: pointer;
              transition: var(--transition);
              text-align: left;
            }
            .grid-item:hover {
              border-color: var(--accent-primary);
              background: rgba(139, 92, 246, 0.1);
            }
            .grid-item.active {
              background: var(--accent-primary);
              border-color: var(--accent-primary);
            }
            .book-item {
              display: flex;
              flex-direction: column;
              gap: 4px;
            }
            .book-ta {
              font-size: 12px;
              opacity: 0.7;
            }
            .selected-book-title {
              font-size: 20px;
              font-weight: 700;
              margin-bottom: 20px;
              color: var(--accent-primary);
              text-align: center;
            }
            .ch-grid {
              display: grid;
              grid-template-columns: repeat(5, 1fr);
              gap: 10px;
            }
            .ch-item {
              aspect-ratio: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 600;
              padding: 0;
            }
            
            @media (min-width: 1024px) {
              .selector-overlay {
                align-items: center;
              }
              .selector-panel {
                height: 70vh;
                border-radius: 32px;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BibleSelector;
