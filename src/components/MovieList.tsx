import { IMovie } from '../types/types';
import MovieListItem from './MovieListItem';

interface MovieListProps {
  movies: IMovie[];
  onSelectMovie(id: string): void;
}

function MovieList({ movies, onSelectMovie }: MovieListProps) {
  if (movies.length === 0) {
    return <p className="error">Start searching for movie!</p>;
  }
  return (
    <ul className="list list-movies">
      {movies?.map(movie => (
        <MovieListItem
          key={movie.imdbID}
          movie={movie}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
}

export default MovieList;
