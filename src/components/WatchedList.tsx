import { IWatchedMovie } from '../types/types';
import WatchedListItem from './WatchedListItem';

interface WatchedListProps {
  watched: IWatchedMovie[];
  onDeleteWatched(id: string): void;
}

function WatchedList({ watched, onDeleteWatched }: WatchedListProps) {
  return (
    <ul className="list">
      {watched.map(movie => (
        <WatchedListItem
          key={movie.imdbID}
          movie={movie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

export default WatchedList;
