import {Difficulty} from './difficulty.model';
import {Ingredient} from './ingredients.model';
import {Duration} from './duration.model';


export interface Recipe {
  id: string;
  name: string;
  img: string;
  difficulty: Difficulty;
  duration: Duration;
  servings: number;
  lastEdited: string;
  ingredients: Ingredient[];
  preparation: string;
}
