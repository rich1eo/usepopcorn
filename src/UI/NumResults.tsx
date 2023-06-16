import { IMovie } from '../types/types';

interface NumResultsProps {
  movies: IMovie[];
}

function NumResults({ movies }: NumResultsProps) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

export default NumResults;
