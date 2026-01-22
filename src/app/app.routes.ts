import {Routes} from '@angular/router';
import {RecipeList} from './recipes/components/recipe-list/recipe-list';
import {RecipeDetail} from './recipes/components/recipe-detail/recipe-detail';


export const routes: Routes = [
  {
    path: 'recipes',
    component: RecipeList,
    pathMatch: "full"
  },
  {
    path: "recipes/:recipeId",
    component: RecipeDetail,
    pathMatch: "full"
  },
  {
    path: "",
    redirectTo: '/recipes',
    pathMatch: "full"
  }
];
