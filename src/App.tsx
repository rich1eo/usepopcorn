import { ChangeEvent, useEffect, useState } from 'react';
import { IAPIResponse, IMovie, IWatchedMovie } from './types/types';
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
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [watchedMovies, setWatchedMovies] = useState<IWatchedMovie[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // TODO: Convert to event handler function
  useEffect(() => {
    if (!query) return;

    const controller = new AbortController();

    async function getMovies() {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error('Something went wrong during fetching!');
        }

        const data: IAPIResponse = await res.json();

        if (data.Error) {
          throw new Error(data.Error);
        }

        if (data.Search) {
          setMovies(data.Search);
          setError('');
        }
      } catch (err) {
        if (err instanceof Error) {
          if (err.name !== 'AbortError') {
            setError(err.message);
          }
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }

    handleCloseMovie();
    getMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

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
