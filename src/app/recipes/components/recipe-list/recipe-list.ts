import {Component, inject, OnInit, signal} from '@angular/core';
import {RecipeCard} from '../recipe-card/recipe-card';
import {RecipeData} from '../../services/recipe-data';
import {Recipe} from '../../models/recipe.model';


@Component({
  selector: 'app-recipe-list',
  imports: [
    RecipeCard
  ],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss'
})
export class RecipeList implements OnInit {

  protected readonly dataService = inject(RecipeData);
  protected recipes = signal<Recipe[]>([]);


  public ngOnInit() {
    this.dataService.getAllRecipes()
      .subscribe(recipes => this.recipes.set(recipes));
  }

}
