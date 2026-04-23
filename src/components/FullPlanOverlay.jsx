import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const FullPlanOverlay = ({ isOpen, onClose, plan, currentDay, onSelectDay }) => {
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="full-plan-overlay"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="overlay-header">
            <h2 className="brand-font">Reading Schedule</h2>
            <button className="close-btn" onClick={onClose}><X /></button>
          </div>

          <div className="overlay-content scroll-bar">
            {months.map((month, mIdx) => (
              <div key={month} className="month-section">
                <h3 className="month-title">{month}</h3>
                <div className="days-grid">
                  {plan.slice(mIdx * 30, (mIdx + 1) * 30).map((day) => (
                    <button 
                      key={day.day}
                      className={`day-cell ${day.day === currentDay ? 'is-today' : ''}`}
                      onClick={() => onSelectDay(day.day)}
                    >
                      <span className="d-num">{day.day}</span>
                      <div className="d-preview">
                        {day.readings[0].book.substring(0, 3)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <style jsx="true">{`
            .full-plan-overlay {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(10, 10, 15, 0.98);
              backdrop-filter: blur(20px);
              z-index: 9999;
              display: flex;
              flex-direction: column;
              padding: 25px;
            }
            .overlay-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-bottom: 20px;
              border-bottom: 1px solid var(--glass-border);
              margin-bottom: 10px;
            }
            .close-btn {
              background: rgba(255, 255, 255, 0.05);
              border: 1px solid var(--glass-border);
              color: white;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: var(--transition);
            }
            .close-btn:hover {
              background: rgba(255, 0, 0, 0.2);
              border-color: rgba(255, 0, 0, 0.3);
            }
            .overlay-content {
              flex: 1;
              overflow-y: auto;
              padding: 20px 0;
              padding-right: 10px;
            }
            .month-section {
              margin-bottom: 40px;
            }
            .month-title {
              font-size: 22px;
              margin-bottom: 20px;
              color: var(--accent-primary);
              font-family: 'Outfit', sans-serif;
              display: flex;
              align-items: center;
              gap: 10px;
            }
            .month-title::after {
              content: '';
              flex: 1;
              height: 1px;
              background: linear-gradient(90deg, var(--accent-primary), transparent);
              opacity: 0.3;
            }
            .days-grid {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(65px, 1fr));
              gap: 12px;
            }
            .day-cell {
              aspect-ratio: 1;
              background: rgba(255, 255, 255, 0.03);
              border: 1px solid var(--glass-border);
              border-radius: 14px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              color: white;
              cursor: pointer;
              transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .day-cell:hover {
              background: rgba(139, 92, 246, 0.15);
              border-color: var(--accent-primary);
              transform: translateY(-3px);
              box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
            }
            .day-cell.is-today {
              border-color: var(--accent-primary);
              background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.05));
              box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);
            }
            .day-cell.is-today .d-num {
              color: var(--accent-primary);
            }
            .d-num {
              font-weight: 800;
              font-size: 18px;
              line-height: 1;
            }
            .d-preview {
              font-size: 9px;
              color: var(--text-muted);
              text-transform: uppercase;
              margin-top: 4px;
              letter-spacing: 0.5px;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullPlanOverlay;
