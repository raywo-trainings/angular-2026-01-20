import {PortionUnits} from './portion-units.model';


export interface Ingredient {
  quantity: number;
  unit: PortionUnits;
  name: string;
}
