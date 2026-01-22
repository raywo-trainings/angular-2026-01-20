import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Recipe, recipeFromDto, recipeToDto} from '../models/recipe.model';
import {RecipeDto} from '../models/recipeDto.model';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class RecipeData {

  readonly #http = inject(HttpClient);

  #baseUrl = environment.apiUrl;


  public getAllRecipes(): Observable<Recipe[]> {
    return this.#http.get<RecipeDto[]>(this.url())
      .pipe(
        map(recipeDtos => recipeDtos.map(dto => recipeFromDto(dto)))
      );
  }


  public getRecipe(id: string): Observable<Recipe> {
    return this.#http.get<RecipeDto>(this.url(id))
      .pipe(map(dto => recipeFromDto(dto)));
  }


  public createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.#http.post<RecipeDto>(this.url(), recipeToDto(recipe))
      .pipe(map(dto => recipeFromDto(dto)));
  }


  public updateRecipe(recipe: Recipe): Observable<Recipe> {
    return this.#http.put<RecipeDto>(this.url(recipe), recipeToDto(recipe))
      .pipe(map(dto => recipeFromDto(dto)));
  }


  public deleteRecipe(id: string): Observable<void> {
    return this.#http.delete<void>(this.url(id));
  }


  private url(idOrRecipe?: string | Recipe): string {
    if (!idOrRecipe) {
      return `${this.#baseUrl}/recipes`;
    }

    return `${this.#baseUrl}/recipes${this.getIdentifier(idOrRecipe) ? `/${this.getIdentifier(idOrRecipe)}` : ''}`;
  }


  private getIdentifier(recipe?: Recipe | string): string | null {
    if (!recipe) return null;

    if (typeof recipe === 'string') return recipe;

    return recipe.id;
  }

}
