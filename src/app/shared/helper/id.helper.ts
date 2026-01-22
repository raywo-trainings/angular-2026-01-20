import {Identifiable} from '../models/identifiable.model';
import {environment} from '../../../environments/environment';


export function url(identifiable?: string | Identifiable): string {
  const url = environment.apiUrl + '/recipes';

  if (!identifiable) return url;

  return `${url}${getIdentifier(identifiable) ? `/${getIdentifier(identifiable)}` : ''}`;
}


export function getIdentifier(identifiable?: Identifiable | string): string | null {
  if (!identifiable) return null;

  if (typeof identifiable === 'string') return identifiable;

  return identifiable.id;
}
