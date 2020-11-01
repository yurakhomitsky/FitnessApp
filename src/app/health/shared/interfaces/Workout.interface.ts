export interface Workout {
  name: string;
  type: string;
  strength: Strength;
  endurance: Endurance;
  timestamp?: number;
  key: string;
  exists: () => boolean;
}

interface Endurance {
  distance: number;
  duration: number;
}
interface Strength {
  weight: number;
  reps: number;
  sets: number;
}
