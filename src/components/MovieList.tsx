import { IMovie } from '../types/IMovie';
import MovieListItem from './MovieListItem';

interface MovieListProps {
  movies: IMovie[];
}

function MovieList({ movies }: MovieListProps) {
  return (
    <ul className="list">
      {movies?.map(movie => (
        <MovieListItem key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

export default MovieList;
