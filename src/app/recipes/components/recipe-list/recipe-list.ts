import {Component, inject, OnInit, signal} from '@angular/core';
import {RecipeCard} from '../recipe-card/recipe-card';
import {RecipeData} from '../../services/recipe-data';
import {Recipe} from '../../models/recipe.model';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-recipe-list',
  imports: [
    RecipeCard,
    RouterLink
  ],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss'
})
export class RecipeList implements OnInit {

  protected readonly dataService = inject(RecipeData);
  protected readonly recipes = signal<Recipe[]>([]);
  protected readonly error = signal<string | null>(null);


  public ngOnInit() {
    this.fetchAllRecipes();
  }


  protected onRecipeDeleted(recipe: Recipe) {
    this.dataService.deleteRecipe(recipe.id)
      // .subscribe(() => this.fetchAllRecipes());
      .subscribe(() => {
        const newRecipes = this
          .recipes()
          .filter(r => r.id !== recipe.id);
        this.recipes.set(newRecipes);
      })
  }


  private fetchAllRecipes() {
    this.dataService.getAllRecipes()
      .subscribe({
        next: recipes => {
          this.error.set(null);
          this.recipes.set(recipes)
        },
        error: error => {
          this.error.set("Liste konnte nicht geladen werden, weil der Server nicht erreichbar ist.");
          console.error('Error fetching recipes:', error)
        }
      });
  }

}
