import { IMovie } from '../types/IMovie';

interface MovieListItemProps {
  movie: IMovie;
}

function MovieListItem({ movie }: MovieListItemProps) {
  return (
    <li>
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
