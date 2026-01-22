export enum Difficulty {
  EASY = 'Einfach',
  MEDIUM = 'Mittel',
  HARD = 'Schwer'
}


export function difficultyFromDto(dto: string): Difficulty {
  if (dto === 'Einfach') return Difficulty.EASY;
  if (dto === 'Mittel') return Difficulty.MEDIUM;

  return Difficulty.HARD;
}
