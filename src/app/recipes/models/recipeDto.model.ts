import {PortionUnits} from './portion-units.model';


export interface RecipeDto {
  id: string;
  name: string;
  img: string;
  portions: number;
  lastEdited: string;
  ingredients: {
    name: string;
    unit: PortionUnits;
    quantity: number;
  }[];
  preparation: string;
  level_of_difficulty: string;
  duration: {
    value: number;
    unit: string;
  };
}
