import { ChangeEvent } from 'react';
import Search from '../UI/Search';
import Logo from '../UI/Logo';
import NumResults from '../UI/NumResults';

interface NavBarProps {
  moviesLen: number;
  query: string;
  onHandleQuery(value: string): void;
}

function NavBar({ moviesLen, query, onHandleQuery }: NavBarProps) {
  function handleChangeQuery(event: ChangeEvent<HTMLInputElement>) {
    onHandleQuery(event.target.value);
  }

  return (
    <nav className="nav-bar">
      <Logo />
      <Search
        value={query}
        onChange={handleChangeQuery}
        placeholder="Search movies..."
      />
      <NumResults moviesLen={moviesLen} />
    </nav>
  );
}

export default NavBar;
