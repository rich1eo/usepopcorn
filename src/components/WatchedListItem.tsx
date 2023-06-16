import { IWatchedMovie } from '../types/types';

interface WatchedListItemProps {
  movie: IWatchedMovie;
  onDeleteWatched(id: string): void;
}

function WatchedListItem({ movie, onDeleteWatched }: WatchedListItemProps) {
  function handleDeleteWatched() {
    onDeleteWatched(movie.imdbID);
  }

  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className="btn-delete" onClick={handleDeleteWatched}>
          X
        </button>
      </div>
    </li>
  );
}

export default WatchedListItem;
