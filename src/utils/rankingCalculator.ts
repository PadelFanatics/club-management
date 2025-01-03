import type { PlayerSkillAssessment } from '../types';

export function calculateInitialRanking(assessment: PlayerSkillAssessment): number {
  // If they have a Playtomic ranking, use that as the base
  if (assessment.playtomicRanking) {
    return assessment.playtomicRanking;
  }

  // Base ranking for new players
  let ranking = 1000;

  // Adjust for years of experience
  ranking += assessment.yearsPlayed * 50;

  // Adjust for weekly matches
  ranking += assessment.weeklyMatches * 25;

  // Bonus for previous racket sports experience
  if (assessment.previousSports.includes('tennis')) ranking += 100;
  if (assessment.previousSports.includes('squash')) ranking += 75;
  if (assessment.previousSports.includes('badminton')) ranking += 50;
  if (assessment.previousSports.includes('table-tennis')) ranking += 25;

  // Cap the initial ranking
  return Math.min(Math.max(ranking, 800), 1500);
}