import React from 'react';
import { Heart, Trash2, BookOpen } from 'lucide-react';

const Favorites = ({ favorites, toggleFavorite }) => {
  return (
    <div className="favorites-container">
      <div className="section-header">
        <h2 className="brand-font">Saved Verses</h2>
        <span className="count">{favorites.length} saved</span>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state glass-card">
          <Heart size={48} className="empty-icon" />
          <h3>No favorites yet</h3>
          <p>Tap the heart icon on any verse to save it here for quick access.</p>
        </div>
      ) : (
        <div className="fav-list">
          {favorites.map((fav, idx) => (
            <div key={idx} className="glass-card fav-card">
              <div className="fav-header">
                <span className="fav-ref">{fav.ref}</span>
                <button 
                  className="remove-btn"
                  onClick={() => toggleFavorite(fav)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="fav-text-en">{fav.english !== '...' ? fav.english : ''}</p>
              {fav.tamil !== '...' && <p className="fav-text-ta">{fav.tamil}</p>}
            </div>
          ))}
        </div>
      )}

      <style jsx="true">{`
        .favorites-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .count {
          color: var(--text-muted);
          font-size: 14px;
        }
        .empty-state {
          text-align: center;
          padding: 60px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }
        .empty-icon {
          color: var(--glass-border);
        }
        .fav-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .fav-card {
          padding: 20px;
          border-radius: 16px;
        }
        .fav-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .fav-ref {
          font-weight: 700;
          color: var(--accent-primary);
          font-size: 14px;
        }
        .remove-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 5px;
          transition: var(--transition);
        }
        .remove-btn:hover {
          color: var(--danger);
        }
        .fav-text-en {
          font-size: 16px;
          margin-bottom: 8px;
        }
        .fav-text-ta {
          font-size: 15px;
          color: var(--text-muted);
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
};

export default Favorites;
