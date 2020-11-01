export interface Meal {
  name: string;
  ingredients: string[];
  timestamp?: number;
  key: string;
  exists: () => boolean;
}
