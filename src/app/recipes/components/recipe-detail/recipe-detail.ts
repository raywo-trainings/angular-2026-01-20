import {Component, inject, input} from '@angular/core';
import {RecipeData} from '../../services/recipe-data';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faClock} from '@fortawesome/free-regular-svg-icons';
import {faExclamation} from '@fortawesome/free-solid-svg-icons';
import {Router, RouterLink} from '@angular/router';
import {rxResource} from '@angular/core/rxjs-interop';


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

  private readonly dataService = inject(RecipeData);
  private readonly router = inject(Router);

  protected readonly recipe = rxResource({
    params: () => ({id: this.recipeId()}),
    stream: ({params}) => this.dataService.getRecipe(params.id)
  });

  protected readonly faClock = faClock;
  protected readonly faExclamation = faExclamation;

  public readonly recipeId = input.required<string>();


  protected onDelete() {
    this.dataService.deleteRecipe(this.recipeId())
      .subscribe(() => {
        void this.router.navigate(['recipes']);
      });
  }

}
