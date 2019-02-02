import { FilterType } from './filter-type.enum';

export interface IFilter {
  name: string;
  type: FilterType;
  value?: string | number;
  description?: string;
  icon?: string;
  placeholder?: string;
  validators?: {
    regex?: RegExp;
    required?: boolean;
  };
  nullOption?: {
    canBeNull: boolean;
    textToClear: string;
  };
  values?: (string | number)[];
  disabled?: boolean;
  readonly?: boolean;
}
