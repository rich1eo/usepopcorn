import { ChangeEvent, useEffect, useState } from 'react';
import { IMovie } from './types/types';
import { IWatchedData } from './types/types';
import { fetchMovies } from './utils/utils';
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

interface MainProps {
  children: React.ReactNode;
}

function Main({ children }: MainProps) {
  return <main className="main">{children}</main>;
}

export default function App() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [watchedMovies, setWatchedMovies] = useState<IWatchedData[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!query) return;

    async function getMovies() {
      try {
        setIsLoading(true);
        const res = await fetchMovies(
          `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`
        );
        res && setMovies(res);
        setError('');
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
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

    getMovies();
  }, [query]);

  function handleSelectMovie(id: string) {
    setSelectedId(selectedId => (id === selectedId ? '' : id));
  }

  function handleCloseMovie() {
    setSelectedId('');
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
            />
          ) : (
            <>
              <WatchedSummary watched={watchedMovies} />
              <WatchedList watched={watchedMovies} />
            </>
          )}
        </ListBox>
      </Main>
    </>
  );
}
