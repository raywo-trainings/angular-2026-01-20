import {Difficulty, difficultyFromDto} from './difficulty.model';
import {Ingredient} from './ingredients.model';
import {Duration} from './duration.model';
import {RecipeDto} from './recipeDto.model';
import {TimeUnit} from './time-unit.model';


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


export function recipeFromDto(dto: RecipeDto): Recipe {
  return {
    id: dto.id,
    name: dto.name,
    img: dto.img,
    difficulty: difficultyFromDto(dto.level_of_difficulty),
    duration: {
      value: dto.duration.value,
      unit: dto.duration.unit as TimeUnit
    },
    servings: dto.portions,
    lastEdited: dto.lastEdited,
    ingredients: dto.ingredients,
    preparation: dto.preparation
  }
}
