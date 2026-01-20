import {Component} from '@angular/core';
import {recipes} from '../../../../data/recipe.dummy.data';


@Component({
  selector: 'app-recipe-list',
  imports: [],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss',
})
export class RecipeList {

  protected readonly recipes = recipes;

}
