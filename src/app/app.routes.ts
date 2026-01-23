import {Routes} from '@angular/router';
import {RecipeList} from './recipes/components/recipe-list/recipe-list';
import {RecipeDetail} from './recipes/components/recipe-detail/recipe-detail';
import {RecipeEdit} from './recipes/components/recipe-edit/recipe-edit';


export const routes: Routes = [
  {
    path: "",
    redirectTo: '/recipes',
    pathMatch: "full"
  },
  {
    path: 'recipes',
    component: RecipeList,
  },
  // must be placed before recipes/:recipeId for pattern matching to work
  {
    path: "recipes/new",
    component: RecipeEdit,
  },
  {
    path: 'recipes/:recipeId/edit',
    component: RecipeEdit,
    title: 'Edit Recipe',
  },
  {
    path: "recipes/:recipeId",
    component: RecipeDetail,
  }
];
