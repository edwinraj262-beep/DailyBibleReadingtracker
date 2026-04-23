import React, { useState, useMemo } from 'react';
import { BookOpen, Calendar, ChevronLeft, ChevronRight, List } from 'lucide-react';
import { generateReadingPlan, getDayOfYear, getDateFromDay } from '../utils/readingPlanGenerator';
import FullPlanOverlay from './FullPlanOverlay';

const DailyReading = ({ onNavigateToBible }) => {
  const plan = useMemo(() => generateReadingPlan(), []);
  const todayIndex = getDayOfYear();
  const [selectedDay, setSelectedDay] = useState(todayIndex);
  const [isFullPlanOpen, setIsFullPlanOpen] = useState(false);

  const currentReading = plan[selectedDay - 1] || plan[0];

  const handlePrev = () => setSelectedDay(prev => Math.max(1, prev - 1));
  const handleNext = () => setSelectedDay(prev => Math.min(365, prev + 1));

  return (
    <div className="daily-plan-container">
      <div className="section-header">
        <h3 className="brand-font">1-Year Reading Plan</h3>
        <div className="header-actions">
          <button className="icon-btn" onClick={() => setIsFullPlanOpen(true)}>
            <List size={18} />
          </button>
          <span className="day-badge">Day {selectedDay} of 365</span>
        </div>
      </div>

      <div className="glass-card plan-card">
        <div className="plan-header">
          <div className="nav-controls">
            <button className="nav-btn" onClick={handlePrev} disabled={selectedDay === 1}>
              <ChevronLeft size={20} />
            </button>
            <div className="date-display">
              <Calendar size={18} className="accent-text" />
              <div className="title-group">
                <h4>{selectedDay === todayIndex ? "Today's Portion" : `Day ${selectedDay} Portion`}</h4>
                <p className="actual-date">{getDateFromDay(selectedDay)}</p>
              </div>
            </div>
            <button className="nav-btn" onClick={handleNext} disabled={selectedDay === 365}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="readings-list">
          {currentReading.readings.map((r, idx) => (
            <button 
              key={idx} 
              className="reading-item"
              onClick={() => onNavigateToBible(r.book, r.chapter)}
            >
              <div className="r-info">
                <span className="r-book">{r.book} {r.chapter}</span>
                <span className="r-ta tamil-font">{r.tamil} {r.chapter}</span>
              </div>
              <BookOpen size={16} />
            </button>
          ))}
        </div>
        
        {selectedDay !== todayIndex && (
          <button className="reset-btn" onClick={() => setSelectedDay(todayIndex)}>
            Back to Today
          </button>
        )}
      </div>

      <FullPlanOverlay 
        isOpen={isFullPlanOpen} 
        onClose={() => setIsFullPlanOpen(false)} 
        plan={plan}
        currentDay={todayIndex}
        onSelectDay={(day) => {
          setSelectedDay(day);
          setIsFullPlanOpen(false);
        }}
      />

      <style jsx="true">{`
        .daily-plan-container {
          margin-top: 30px;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .icon-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
        }
        .icon-btn:hover {
          background: var(--accent-primary);
          border-color: var(--accent-primary);
        }
        .day-badge {
          font-size: 12px;
          background: var(--accent-primary);
          padding: 4px 12px;
          border-radius: 20px;
          font-weight: 700;
          box-shadow: 0 4px 10px rgba(139, 92, 246, 0.3);
        }
        .plan-card {
          margin-top: 15px;
          padding: 20px;
        }
        .plan-header {
          margin-bottom: 20px;
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: 15px;
        }
        .nav-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .nav-btn {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          opacity: 0.7;
          transition: var(--transition);
        }
        .nav-btn:hover:not(:disabled) {
          opacity: 1;
          color: var(--accent-primary);
        }
        .nav-btn:disabled {
          opacity: 0.2;
          cursor: not-allowed;
        }
        .date-display {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .title-group {
          display: flex;
          flex-direction: column;
        }
        .actual-date {
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 2px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .accent-text {
          color: var(--accent-primary);
        }
        .readings-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .reading-item {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          color: white;
          padding: 15px;
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: var(--transition);
          text-align: left;
        }
        .reading-item:hover {
          background: rgba(139, 92, 246, 0.1);
          border-color: var(--accent-primary);
          transform: translateX(5px);
        }
        .r-info {
          display: flex;
          flex-direction: column;
        }
        .r-book {
          font-weight: 600;
          font-size: 16px;
        }
        .r-ta {
          font-size: 12px;
          color: var(--text-muted);
        }
        .reset-btn {
          width: 100%;
          margin-top: 20px;
          background: none;
          border: 1px dashed var(--glass-border);
          color: var(--text-muted);
          padding: 8px;
          border-radius: 8px;
          font-size: 12px;
          cursor: pointer;
          transition: var(--transition);
        }
        .reset-btn:hover {
          color: var(--accent-primary);
          border-color: var(--accent-primary);
        }
      `}</style>
    </div>
  );
};

export default DailyReading;
