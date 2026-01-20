import {Component} from '@angular/core';
import {RecipeList} from './recipes/components/recipe-list/recipe-list';


@Component({
  selector: 'app-root',
  imports: [
    RecipeList
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
