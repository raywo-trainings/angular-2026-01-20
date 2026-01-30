import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Recipe, recipeFromDto, recipeToDto} from '../models/recipe.model';
import {RecipeDto} from '../models/recipeDto.model';
import {url} from '../../shared/helper/id.helper';


@Injectable({
  providedIn: 'root',
})
export class RecipeData {

  private readonly http = inject(HttpClient);


  public getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<RecipeDto[]>(url())
      .pipe(
        map(recipeDtos => recipeDtos.map(dto => recipeFromDto(dto)))
      );
  }


  public getRecipe(id: string): Observable<Recipe> {
    return this.http.get<RecipeDto>(url(id))
      .pipe(
        map(dto => recipeFromDto(dto)),
        // delay(3000)
      );
  }


  public createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<RecipeDto>(url(), recipeToDto(recipe))
      .pipe(map(dto => recipeFromDto(dto)));
  }


  public updateRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.put<RecipeDto>(url(recipe), recipeToDto(recipe))
      .pipe(map(dto => recipeFromDto(dto)));
  }


  public deleteRecipe(id: string): Observable<void> {
    return this.http.delete<void>(url(id));
  }

}
