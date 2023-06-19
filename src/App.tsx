import { ChangeEvent, useRef, useState } from 'react';
import { IWatchedMovie } from './types/types';
import { useLocalStorageState } from './hooks/useLocalStorageState';
import { useKey } from './hooks/useKey';
import { useMovies } from './hooks/useMovies';

import NavBar from './components/NavBar';
import ListBox from './components/ListBox';
import Logo from './UI/Logo';
import Search from './UI/Search';
import NumResults from './UI/NumResults';
import MovieList from './components/MovieList';
import WatchedSummary from './components/WatchedSummary';
import WatchedList from './components/WatchedList';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import MovieDetails from './components/MovieDetails';
import Main from './components/Main';

export default function App() {
  const [selectedId, setSelectedId] = useState<string>('');
  const [query, setQuery] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null!);

  const { movies, isLoading, error } = useMovies(query);
  const [watchedMovies, setWatchedMovies] = useLocalStorageState<
    IWatchedMovie[]
  >([], 'watched');

  useKey('Enter', () => {
    if (document.activeElement === inputRef.current) return;
    setQuery('');
    inputRef.current.focus();
  });

  function handleSelectMovie(id: string) {
    setSelectedId(selectedId => (id === selectedId ? '' : id));
  }

  function handleCloseMovie() {
    setSelectedId('');
  }

  function handleAddWatchedMovie(movie: IWatchedMovie) {
    const isDuplicate = watchedMovies.find(
      watchedMovie => watchedMovie.imdbID === movie.imdbID
    );
    if (isDuplicate) return;
    setWatchedMovies(watchedMovies => [movie, ...watchedMovies]);
  }

  function handleDeleteWatched(id: string) {
    setWatchedMovies(watchedMovies =>
      watchedMovies.filter(watchedMovie => watchedMovie.imdbID !== id)
    );
  }

  function handleSetQuery(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search
          value={query}
          onChange={handleSetQuery}
          placeholder="Search movies..."
          ref={inputRef}
        />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <ListBox>
          {isLoading && <Loader />}
          {!isLoading && error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </ListBox>
        <ListBox>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatchedMovie}
              watchedMovies={watchedMovies}
            />
          ) : (
            <>
              <WatchedSummary watched={watchedMovies} />
              <WatchedList
                watched={watchedMovies}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </ListBox>
      </Main>
    </>
  );
}
