import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { playerApi } from '../../lib/api';
import { calculateInitialRanking } from '../../utils/rankingCalculator';
import type { PlayerSkillAssessment } from '../../types';

export function RankingQuestionnaire() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [assessment, setAssessment] = useState<PlayerSkillAssessment>({
    playtomicRanking: null,
    yearsPlayed: 0,
    weeklyMatches: 0,
    previousSports: [],
    playStyle: 'recreational'
  });

  const questions = [
    {
      title: "What's your Playtomic ranking?",
      component: (
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Enter your Playtomic ranking"
            className="w-full px-4 py-2 border rounded-md"
            value={assessment.playtomicRanking || ''}
            onChange={(e) => setAssessment({
              ...assessment,
              playtomicRanking: parseInt(e.target.value) || null
            })}
          />
          <p className="text-sm text-gray-500">
            You can find this in your Playtomic app profile
          </p>
        </div>
      )
    },
    {
      title: "How long have you been playing padel?",
      component: (
        <select
          className="w-full px-4 py-2 border rounded-md"
          value={assessment.yearsPlayed}
          onChange={(e) => setAssessment({
            ...assessment,
            yearsPlayed: parseInt(e.target.value)
          })}
        >
          <option value="0">Just starting</option>
          <option value="1">Less than a year</option>
          <option value="2">1-2 years</option>
          <option value="3">2-5 years</option>
          <option value="5">5+ years</option>
        </select>
      )
    },
    {
      title: "How many matches do you play per week?",
      component: (
        <select
          className="w-full px-4 py-2 border rounded-md"
          value={assessment.weeklyMatches}
          onChange={(e) => setAssessment({
            ...assessment,
            weeklyMatches: parseInt(e.target.value)
          })}
        >
          <option value="0">Less than 1</option>
          <option value="1">1-2 matches</option>
          <option value="3">3-5 matches</option>
          <option value="5">5+ matches</option>
        </select>
      )
    },
    {
      title: "What's your playing background?",
      component: (
        <div className="space-y-2">
          {['tennis', 'squash', 'badminton', 'table-tennis'].map(sport => (
            <label key={sport} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={assessment.previousSports.includes(sport)}
                onChange={(e) => {
                  const sports = e.target.checked
                    ? [...assessment.previousSports, sport]
                    : assessment.previousSports.filter(s => s !== sport);
                  setAssessment({ ...assessment, previousSports: sports });
                }}
              />
              <span className="capitalize">{sport}</span>
            </label>
          ))}
        </div>
      )
    }
  ];

  const handleNext = async () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const initialRanking = calculateInitialRanking(assessment);
      try {
        await playerApi.updatePlayerProfile(assessment.playerId, {
          ranking: initialRanking,
          skill_assessment: assessment
        });
        navigate('/profile');
      } catch (error) {
        console.error('Failed to save ranking:', error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-500">
            Step {step + 1} of {questions.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round((step + 1) / questions.length * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 rounded-full h-2 transition-all"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">{questions[step].title}</h2>
      {questions[step].component}

      <div className="mt-6 flex justify-between">
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="px-4 py-2 text-indigo-600 hover:text-indigo-700"
          >
            Back
          </button>
        )}
        <button
          onClick={handleNext}
          className="ml-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {step === questions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}