import {Injectable} from '@angular/core';
import {recipes} from '../../../data/recipe.dummy.data';
import {Recipe} from '../models/recipe.model';


@Injectable({
  providedIn: 'root',
})
export class RecipeData {

  readonly #recipes: Recipe[] = recipes;

  public get recipes(): Recipe[] {
    return this.#recipes;
  }

}
