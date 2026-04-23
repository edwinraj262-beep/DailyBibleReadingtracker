import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Book, MessageSquare, ExternalLink } from 'lucide-react';

const VerseStudyOverlay = ({ isOpen, onClose, verse, book, chapter }) => {
  const [embedUrl, setEmbedUrl] = React.useState(null);

  if (!verse) return null;

  const getSlug = (b) => b.toLowerCase().replace(/ /g, '');

  const handleOpenInternal = (type) => {
    const slug = getSlug(book);
    if (type === 'historical') {
      setEmbedUrl(`https://historicalchristian.faith/${slug}/${chapter}/${verse.verse}`);
    } else {
      setEmbedUrl(`https://www.google.com/search?q=John+MacArthur+Commentary+${book}+${chapter}+verse+${verse.verse}&igu=1`);
    }
  };

  const handleClose = () => {
    setEmbedUrl(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="verse-study-overlay"
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          <div className="v-study-handle" onClick={handleClose} />
          
          <div className="v-study-header">
            <div className="v-ref">
              <span className="v-label">{book} {chapter}:{verse.verse}</span>
              <button className="v-close" onClick={handleClose}><X size={20} /></button>
            </div>
            {!embedUrl && <p className="v-display-text">{verse.text}</p>}
          </div>

          <div className="v-study-content scroll-bar">
            {embedUrl ? (
              <div className="embed-container">
                <div className="embed-tools">
                  <button className="back-btn" onClick={() => setEmbedUrl(null)}>← Back to Resources</button>
                  <a href={embedUrl} target="_blank" rel="noreferrer" className="pop-out">
                    <span>Open in New Tab</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
                <div className="iframe-wrapper">
                  <div className="iframe-loading">
                    <p>Loading Commentary...</p>
                    <span className="subtitle">If this stays blank, the source site may be blocking internal viewing for security. Use the button above to open it in a new tab.</span>
                  </div>
                  <iframe 
                    src={embedUrl} 
                    title="Commentary" 
                    className="commentary-iframe"
                    onLoad={(e) => {
                      const loadingEl = e.target.parentNode.querySelector('.iframe-loading');
                      if (loadingEl) loadingEl.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="study-section">
                  <div className="section-title">
                    <Book size={18} />
                    <span>Historical Commentaries</span>
                  </div>
                  <div className="resource-card historical">
                    <p>Access verse-by-verse insights from Early Church Fathers and Reformers.</p>
                    <button 
                      onClick={() => handleOpenInternal('historical')}
                      className="resource-btn"
                    >
                      <Book size={14} />
                      <span>View Inside App</span>
                    </button>
                  </div>
                </div>

                <div className="study-section">
                  <div className="section-title">
                    <MessageSquare size={18} />
                    <span>Expository Study</span>
                  </div>
                  <div className="resource-card macarthur">
                    <p>In-depth exposition and theological notes by John MacArthur.</p>
                    <button 
                      onClick={() => handleOpenInternal('macarthur')}
                      className="resource-btn"
                    >
                      <MessageSquare size={14} />
                      <span>View Inside App</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <style jsx="true">{`
            .verse-study-overlay {
              position: fixed;
              bottom: 0;
              left: 0;
              right: 0;
              height: 85vh;
              background: #0a0a0f;
              border-top: 1px solid var(--glass-border);
              border-top-left-radius: 24px;
              border-top-right-radius: 24px;
              z-index: 10000;
              display: flex;
              flex-direction: column;
              box-shadow: 0 -20px 60px rgba(0, 0, 0, 0.8);
              padding: 20px;
            }
            .v-study-handle {
              width: 40px;
              height: 4px;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 2px;
              margin: -10px auto 15px;
              cursor: pointer;
            }
            .v-study-header {
              margin-bottom: 25px;
            }
            .v-ref {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 10px;
            }
            .v-label {
              font-family: 'Outfit', sans-serif;
              font-weight: 700;
              color: var(--accent-primary);
              font-size: 18px;
            }
            .v-close {
              background: none;
              border: none;
              color: var(--text-muted);
              cursor: pointer;
            }
            .v-display-text {
              font-size: 16px;
              line-height: 1.5;
              color: white;
              opacity: 0.9;
              font-style: italic;
              border-left: 2px solid var(--accent-primary);
              padding-left: 15px;
            }
            .v-study-content {
              flex: 1;
              overflow-y: auto;
              display: flex;
              flex-direction: column;
              gap: 25px;
            }
            .embed-container {
              flex: 1;
              display: flex;
              flex-direction: column;
              height: 100%;
              overflow: hidden;
              border-radius: 12px;
              background: white;
            }
            .embed-tools {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 8px 12px;
              background: #f8f9fa;
              border-bottom: 1px solid #dee2e6;
            }
            .back-btn {
              background: none;
              border: none;
              color: var(--accent-primary);
              font-weight: 600;
              cursor: pointer;
              font-size: 13px;
            }
            .pop-out {
              color: var(--accent-primary);
              display: flex;
              align-items: center;
              gap: 8px;
              text-decoration: none;
              font-size: 12px;
              font-weight: 700;
              text-transform: uppercase;
            }
            .iframe-wrapper {
              flex: 1;
              position: relative;
              background: #f8f9fa;
            }
            .iframe-loading {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 40px;
              text-align: center;
              color: #495057;
              z-index: 1;
            }
            .iframe-loading p {
              font-weight: 700;
              font-size: 16px;
              margin-bottom: 8px;
            }
            .iframe-loading .subtitle {
              font-size: 12px;
              color: #6c757d;
              line-height: 1.5;
              max-width: 280px;
            }
            .commentary-iframe {
              position: relative;
              z-index: 2;
              width: 100%;
              height: 100%;
              border: none;
            }
            .study-section {
              display: flex;
              flex-direction: column;
              gap: 12px;
            }
            .section-title {
              display: flex;
              align-items: center;
              gap: 8px;
              color: var(--text-muted);
              font-size: 14px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .resource-card {
              background: rgba(255, 255, 255, 0.03);
              border: 1px solid var(--glass-border);
              border-radius: 16px;
              padding: 15px;
            }
            .resource-card p {
              font-size: 13px;
              color: var(--text-muted);
              margin-bottom: 12px;
            }
            .resource-btn {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              background: rgba(139, 92, 246, 0.1);
              border: 1px solid rgba(139, 92, 246, 0.3);
              color: white;
              padding: 10px;
              border-radius: 10px;
              text-decoration: none;
              font-size: 14px;
              font-weight: 600;
              transition: var(--transition);
            }
            .resource-btn:hover {
              background: var(--accent-primary);
              border-color: var(--accent-primary);
              transform: translateY(-2px);
            }
            .historical .resource-btn {
              background: rgba(16, 185, 129, 0.1);
              border-color: rgba(16, 185, 129, 0.3);
            }
            .historical .resource-btn:hover {
              background: #10b981;
              border-color: #10b981;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VerseStudyOverlay;
