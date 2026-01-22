import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Recipe, recipeFromDto} from '../models/recipe.model';
import {RecipeDto} from '../models/recipeDto.model';


@Injectable({
  providedIn: 'root',
})
export class RecipeData {

  readonly #http = inject(HttpClient);

  #baseUrl = "http://localhost:3001/recipes";


  public getAllRecipes(): Observable<Recipe[]> {
    return this.#http.get<RecipeDto[]>(this.#baseUrl)
      .pipe(
        map(recipeDtos => recipeDtos.map(dto => recipeFromDto(dto)))
      );
  }

  public getRecipe(id: string): Observable<Recipe> {
    return this.#http.get<RecipeDto>(`${this.#baseUrl}/${id}`)
      .pipe(map(dto => recipeFromDto(dto)));
  }

}
