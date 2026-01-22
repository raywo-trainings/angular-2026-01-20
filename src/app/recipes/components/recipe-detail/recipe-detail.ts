import {Component, effect, inject, input, signal} from '@angular/core';
import {RecipeData} from '../../services/recipe-data';
import {Recipe} from '../../models/recipe.model';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faClock} from '@fortawesome/free-regular-svg-icons';
import {faExclamation} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-recipe-detail',
  imports: [
    FaIconComponent
  ],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss',
})
export class RecipeDetail {

  readonly #dataService = inject(RecipeData);

  protected recipe = signal<Recipe | null>(null);
  protected readonly faClock = faClock;
  protected readonly faExclamation = faExclamation;

  public recipeId = input.required<string>();


  constructor() {
    effect(() => {
      const id = this.recipeId();

      this.#dataService.getRecipe(id)
        .subscribe({
          next: recipe => this.recipe.set(recipe),
          error: () => this.recipe.set(null)
        });
    });
  }

}
