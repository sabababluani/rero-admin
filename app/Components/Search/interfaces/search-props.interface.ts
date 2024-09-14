export interface SearchPropsInterface {
  placeholder?: string;
  onSearch: (value: string) => void;
  results: string[];
  onSelectResult?: (result: string) => void;
}
