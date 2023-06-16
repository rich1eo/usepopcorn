import { IMovie } from '../types/types';

interface MovieListItemProps {
  movie: IMovie;
  onSelectMovie(id: string): void;
}

function MovieListItem({ movie, onSelectMovie }: MovieListItemProps) {
  function handleSelectMovie() {
    onSelectMovie(movie.imdbID);
  }

  return (
    <li onClick={handleSelectMovie}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

export default MovieListItem;
