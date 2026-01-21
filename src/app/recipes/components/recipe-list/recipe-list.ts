import {Component} from '@angular/core';
import {recipes} from '../../../../data/recipe.dummy.data';
import {RecipeCard} from '../recipe-card/recipe-card';


@Component({
  selector: 'app-recipe-list',
  imports: [
    RecipeCard
  ],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss',
})
export class RecipeList {

  protected readonly recipes = recipes;

}
