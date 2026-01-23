import {Component, effect, inject, input, signal} from '@angular/core';
import {RecipeData} from '../../services/recipe-data';
import {Recipe} from '../../models/recipe.model';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faClock} from '@fortawesome/free-regular-svg-icons';
import {faExclamation} from '@fortawesome/free-solid-svg-icons';
import {Router, RouterLink} from '@angular/router';


@Component({
  selector: 'app-recipe-detail',
  imports: [
    FaIconComponent,
    RouterLink
  ],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss',
})
export class RecipeDetail {

  readonly #dataService = inject(RecipeData);
  readonly #router = inject(Router);

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


  protected onDelete() {
    this.#dataService.deleteRecipe(this.recipeId())
      .subscribe(() => {
        void this.#router.navigate(['recipes']);
      });
  }

}
