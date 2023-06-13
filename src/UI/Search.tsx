import { ChangeEvent } from 'react';

interface SearchProps {
  value: string;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  placeholder: string;
}

function Search({ value, onChange, placeholder }: SearchProps) {
  return (
    <input
      className="search"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default Search;
