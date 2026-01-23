import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {PortionUnits} from './portion-units.model';
import {TimeUnit} from './time-unit.model';
import {Difficulty} from './difficulty.model';


export interface IngredientForm {
  name: FormControl<string>;
  unit: FormControl<PortionUnits>;
  quantity: FormControl<number>;
}


export interface DurationForm {
  value: FormControl<number>;
  unit: FormControl<TimeUnit>;
}


export interface RecipeForm {
  name: FormControl<string>;
  servings: FormControl<number>;
  duration: FormGroup<DurationForm>;
  difficulty: FormControl<Difficulty>;
  ingredients: FormArray<FormGroup<IngredientForm>>;
  preparation: FormControl<string>;
}


export const timeUnitOptions = [
  {
    value: TimeUnit.MINUTES,
    label: 'Minuten',
  },
  {
    value: TimeUnit.HOURS,
    label: 'Stunden',
  },
];

export const difficultyOptions = [
  {
    value: Difficulty.EASY,
    label: 'Einfach',
  },
  {
    value: Difficulty.MEDIUM,
    label: 'Mittel',
  },
  {
    value: Difficulty.HARD,
    label: 'Schwer',
  },
];
export const portionUnitOptions = [
  {
    value: PortionUnits.NONE,
    label: 'Keine',
  },
  {
    value: PortionUnits.GRAM,
    label: 'Gramm',
  },
  {
    value: PortionUnits.CUBE,
    label: 'Würfel',
  },
  {
    value: PortionUnits.MILLILITER,
    label: 'Milliliter',
  },
  {
    value: PortionUnits.TEASPOON,
    label: 'Teelöffel',
  },
  {
    value: PortionUnits.TABLESPOON,
    label: 'Esslöffel',
  },
  {
    value: PortionUnits.BALL,
    label: 'Kugel',
  },
  {
    value: PortionUnits.PINCH,
    label: 'Prise',
  },
];
