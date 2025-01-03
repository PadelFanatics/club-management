export type GameLevel = 'Beginner' | 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export interface LevelDescription {
  level: GameLevel;
  rating: string;
  description: string[];
}

export const LEVEL_DESCRIPTIONS: LevelDescription[] = [
  {
    level: 'Beginner',
    rating: '0-2',
    description: [
      "I just started playing padel. I'm still learning the rules.",
      "I'm starting to learn the basic shots. I know the rules.",
      "The game is slow and the rallies are short."
    ]
  },
  {
    level: 'Bronze',
    rating: '2-3',
    description: [
      "I started to come to the net.",
      "I started to succeed with a few lobs.",
      "I started to play with the glass."
    ]
  },
  {
    level: 'Silver',
    rating: '3-4',
    description: [
      "I play padel several times a month, at least weekly.",
      "Attack: I confidently move to the net after a lob, control volleys and overheads, and finish points with my bandeja.",
      "I'm ready to run back for lobs.",
      "Defense: I often return after the glass bounce and succeed with lobs about half the time. I vary between aiming at opponents' feet and lobbing, with the glass now a strong asset in my defense."
    ]
  },
  {
    level: 'Gold',
    rating: '4-5',
    description: [
      "I play and train padel several times a week.",
      "Attack: I control spin, finish points with smashes, and use a consistent bandeja, varying volleys by speed and zone.",
      "I'm skilled with overhead shots (smashes, bandejas, viboras) and can do drop shots and stop volleys.",
      "Defense: I adjust game pace, counter smashes, and handle double glass bounces confidently, saving low shots and placing lobs behind opponents."
    ]
  },
  {
    level: 'Platinum',
    rating: '6-7',
    description: [
      "I control varied smashes and precise volleys. In defense,",
      "I excel with double glass, counter-attacks, and expert saves.",
      "My skills make me a strong, versatile competitor and potential professional coach"
    ]
  }
];