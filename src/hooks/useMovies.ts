import { useEffect, useState } from 'react';
import { IAPIResponse, IMovie } from '../types/types';

export function useMovies(query: string) {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!query) return;

    const controller = new AbortController();

    async function getMovies() {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`,
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
    getMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
