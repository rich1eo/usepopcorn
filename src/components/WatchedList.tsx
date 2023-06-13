import { IWatchedData } from '../types/IWatchedData';
import WatchedListItem from './WatchedListItem';

interface WatchedListProps {
  watched: IWatchedData[];
}

function WatchedList({ watched }: WatchedListProps) {
  return (
    <ul className="list">
      {watched.map(movie => (
        <WatchedListItem key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

export default WatchedList;
