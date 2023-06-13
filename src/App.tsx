import { ChangeEvent, useState } from 'react';
import { IMovie } from './types/IMovie';
import { IWatchedData } from './types/IWatchedData';
import NavBar from './components/NavBar';
import ListBox from './components/ListBox';
import Logo from './UI/Logo';
import Search from './UI/Search';
import NumResults from './UI/NumResults';
import MovieList from './components/MovieList';
import WatchedSummary from './components/WatchedSummary';
import WatchedList from './components/WatchedList';
import StarRating from './components/StarRating';

const tempMovieData: IMovie[] = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt6751668',
    Title: 'Parasite',
    Year: '2019',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
  },
];

const tempWatchedData: IWatchedData[] = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: 'tt0088763',
    Title: 'Back to the Future',
    Year: '1985',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

interface MainProps {
  children: React.ReactNode;
}

function Main({ children }: MainProps) {
  return <main className="main">{children}</main>;
}

export default function App() {
  const [movies, setMovies] = useState<IMovie[]>(tempMovieData);
  const [watchedMovies, setWatchedMovies] =
    useState<IWatchedData[]>(tempWatchedData);
  const [query, setQuery] = useState<string>('');

  function handleSetQuery(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  return (
    <>
      <StarRating
        maxRating={5}
        messages={['Terrible', 'Bad', 'Okey', 'Good', 'Amazing']}
        defaultRating={3}
      />
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
          <MovieList movies={movies} />
        </ListBox>
        <ListBox>
          <WatchedSummary watched={watchedMovies} />
          <WatchedList watched={watchedMovies} />
        </ListBox>
      </Main>
    </>
  );
}
