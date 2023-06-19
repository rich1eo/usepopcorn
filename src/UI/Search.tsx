import { ChangeEvent, forwardRef } from 'react';

interface SearchProps {
  value: string;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  placeholder: string;
}

const Search = forwardRef<HTMLInputElement, SearchProps>(function Search(
  { value, onChange, placeholder },
  ref
) {
  return (
    <input
      className="search"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      ref={ref}
    />
  );
});

export default Search;
