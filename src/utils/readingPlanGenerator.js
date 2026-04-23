import { BIBLE_BOOKS } from '../constants/bibleMetadata';

export const generateReadingPlan = () => {
  const allChapters = [];
  BIBLE_BOOKS.forEach(book => {
    for (let i = 1; i <= book.chapters; i++) {
      allChapters.push({ book: book.english, chapter: i, tamil: book.tamil });
    }
  });

  const totalChapters = allChapters.length; // 1189
  const daysInYear = 365;
  const chaptersPerDayBase = Math.floor(totalChapters / daysInYear); // 3
  const extraChaptersCount = totalChapters % daysInYear; // 94

  const plan = [];
  let currentChapterIndex = 0;

  for (let day = 1; day <= daysInYear; day++) {
    const chaptersToTake = day <= extraChaptersCount ? chaptersPerDayBase + 1 : chaptersPerDayBase;
    const readings = allChapters.slice(currentChapterIndex, currentChapterIndex + chaptersToTake);
    plan.push({
      day,
      readings
    });
    currentChapterIndex += chaptersToTake;
  }

  return plan;
};

export const getDayOfYear = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

export const getDateFromDay = (dayIndex) => {
  const year = new Date().getFullYear();
  const date = new Date(year, 0); // Jan 1st
  date.setDate(dayIndex);
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
};
