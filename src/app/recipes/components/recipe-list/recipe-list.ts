import {Component, inject} from '@angular/core';
import {RecipeCard} from '../recipe-card/recipe-card';
import {RecipeData} from '../../services/recipe-data';


@Component({
  selector: 'app-recipe-list',
  imports: [
    RecipeCard
  ],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss',
})
export class RecipeList {

  protected readonly dataService = inject(RecipeData);

}
