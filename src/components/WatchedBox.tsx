import { useState } from 'react';
import { IWatchedData } from '../types/IWatchedData';
import ButtonToggle from '../UI/ButtonToggle';
import WatchedSummary from './WatchedSummary';
import WatchedList from './WatchedList';

interface WatchedBoxProps {
  tempWatchedData: IWatchedData[];
}

function WatchedBox({ tempWatchedData }: WatchedBoxProps) {
  const [watched, setWatched] = useState<IWatchedData[]>(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState<boolean>(true);

  return (
    <div className="box">
      <ButtonToggle onClick={() => setIsOpen2(open => !open)}>
        {isOpen2 ? '–' : '+'}
      </ButtonToggle>
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedList watched={watched} />
        </>
      )}
    </div>
  );
}

export default WatchedBox;
