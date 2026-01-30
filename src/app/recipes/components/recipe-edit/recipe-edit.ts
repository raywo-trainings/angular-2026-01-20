import {Component, inject, input} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {difficultyOptions, IngredientForm, portionUnitOptions, RecipeForm, timeUnitOptions} from '../../models/recipe-form.model';
import {TimeUnit} from '../../models/time-unit.model';
import {Difficulty} from '../../models/difficulty.model';
import {PortionUnits} from '../../models/portion-units.model';
import {RecipeData} from '../../services/recipe-data';
import {Recipe} from '../../models/recipe.model';
import {Router} from '@angular/router';
import {toObservable} from '@angular/core/rxjs-interop';
import {distinctUntilChanged, filter, switchMap} from 'rxjs';


@Component({
  selector: 'app-recipe-edit',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './recipe-edit.html',
  styleUrl: './recipe-edit.scss',
})
export class RecipeEdit {

  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly recipeService = inject(RecipeData);
  private readonly router = inject(Router);

  protected readonly timeUnitOptions = timeUnitOptions;
  protected readonly difficultyOptions = difficultyOptions;
  protected readonly portionUnitOptions = portionUnitOptions;

  protected readonly recipeForm: FormGroup<RecipeForm>;
  protected recipeToEdit: Recipe | undefined;

  public readonly recipeId = input.required<string>();


  constructor() {
    this.recipeForm = this.createRecipeForm();
    this.fillRecipeToEdit();
  }


  private createIngredientFormGroup(): FormGroup<IngredientForm> {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      unit: [PortionUnits.NONE],
      quantity: [1, [Validators.required, Validators.min(0.1)]],
    });
  }


  protected addIngredientFormGroup() {
    this.recipeForm.controls.ingredients.push(this.createIngredientFormGroup());
  }


  protected removeIngredientFormGroup(index: number) {
    this.recipeForm.controls.ingredients.removeAt(index);
  }


  protected submitForm() {
    if (this.recipeForm.invalid) {
      return;
    }

    const recipe = {
      img: '/recipe_pictures/default.jpg',
      ...this.recipeForm.getRawValue(),
      lastEdited: new Date().toISOString(),
    } as Recipe;

    this.recipeService.createRecipe(recipe)
      .subscribe(() => {
        void this.router.navigate(['recipes']);
      });
  }


  private createRecipeForm(): FormGroup<RecipeForm> {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      servings: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      duration: this.formBuilder.group({
        value: [5, [Validators.required, Validators.min(0), Validators.max(24)]],
        unit: [TimeUnit.MINUTES, [Validators.required]],
      }),
      difficulty: [Difficulty.EASY, [Validators.required]],
      ingredients: this.formBuilder.array([
        this.createIngredientFormGroup(),
        this.createIngredientFormGroup()
      ]),
      preparation: ['', Validators.required]
    });
  }


  private fillRecipeToEdit() {
    toObservable(this.recipeId)
      .pipe(
        distinctUntilChanged(),
        filter(id => id !== undefined && id !== null),
        switchMap(id => this.recipeService.getRecipe(id)),
      )
      .subscribe(recipe => {
        this.recipeToEdit = recipe;
        recipe
          .ingredients
          .forEach((_, index) => {
            if (index > 1) {
              this.recipeForm.controls.ingredients.push(this.createIngredientFormGroup());
            }
          });
        // fill the form with the recipe data
        this.recipeForm.patchValue(recipe);
      });
  }

}
