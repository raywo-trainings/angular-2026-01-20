import {Component, input, output} from '@angular/core';
import {Recipe} from '../../models/recipe.model';


@Component({
  selector: 'app-recipe-card',
  imports: [],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss',
})
export class RecipeCard {

  public recipe = input.required<Recipe>();
  public deleted = output<Recipe>();


  protected onDeleteClick() {
    this.deleted.emit(this.recipe());
  }

}
