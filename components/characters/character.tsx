const Cutoff = {
  face: 0.3,
  torso: 0.4,
  half: 0.5,
  threeQuarter: 0.75,
} as const;

class Character {
  name: string;
  expression: string;

  constructor(name: string, expression: string) {
    this.name = name;
    this.expression = expression;
  }

  get imgUri(): string {
    return `${this.name}_${this.expression}.webp`.toLowerCase();
  }
}
