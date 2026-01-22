import {Difficulty, difficultyFromDto} from './difficulty.model';
import {Ingredient} from './ingredients.model';
import {Duration} from './duration.model';
import {RecipeDto} from './recipeDto.model';
import {TimeUnit} from './time-unit.model';
import {Identifiable} from '../../shared/models/identifiable.model';


export interface Recipe extends Identifiable {
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
  };
}


export function recipeToDto(recipe: Recipe): RecipeDto {
  return {
    id: recipe.id,
    name: recipe.name,
    img: recipe.img,
    level_of_difficulty: recipe.difficulty,
    duration: {
      value: recipe.duration.value,
      unit: recipe.duration.unit
    },
    portions: recipe.servings,
    lastEdited: recipe.lastEdited,
    ingredients: recipe.ingredients,
    preparation: recipe.preparation
  };
}
