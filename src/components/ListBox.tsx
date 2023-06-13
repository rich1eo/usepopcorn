import { useState } from 'react';
import ButtonToggle from '../UI/ButtonToggle';
import { IMovie } from '../types/IMovie';
import MovieList from './MovieList';

interface ListBoxProps {
  movies: IMovie[];
}

function ListBox({ movies }: ListBoxProps) {
  const [isOpen1, setIsOpen1] = useState<boolean>(true);

  return (
    <div className="box">
      <ButtonToggle onClick={() => setIsOpen1(open => !open)}>
        {isOpen1 ? '–' : '+'}
      </ButtonToggle>
      {isOpen1 && <MovieList movies={movies} />}
    </div>
  );
}

export default ListBox;
