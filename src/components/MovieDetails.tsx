import { useEffect, useRef, useState } from 'react';
import { IMovieDetails, IWatchedMovie } from '../types/types';
import { useKey } from '../hooks/useKey';

import Loader from './Loader';
import StarRating from './StarRating';

interface MovieDetailsProps {
  selectedId: string;
  watchedMovies: IWatchedMovie[];
  onCloseMovie(): void;
  onAddWatched(movie: IWatchedMovie): void;
}

function MovieDetails({
  selectedId,
  watchedMovies,
  onCloseMovie,
  onAddWatched,
}: MovieDetailsProps) {
  const [movie, setMovie] = useState<IMovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userRating, setUserRating] = useState<number>(0);

  const countRef = useRef<number>(0);

  useKey('Escape', onCloseMovie);

  useEffect(() => {
    if (!userRating) return;
    countRef.current++;
  }, [userRating]);

  const isWatched = watchedMovies
    .map(watchedMovies => watchedMovies.imdbID)
    .includes(selectedId);

  const watchedRating = watchedMovies.find(
    watchedMovie => watchedMovie.imdbID === selectedId
  )?.userRating;

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${selectedId}`
      );
      const data: IMovieDetails = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!movie) return;
    document.title = `${movie.Title} | usePopcorn`;

    return () => {
      document.title = 'usePopcorn';
    };
  }, [movie]);

  function handleAddToWatched() {
    if (!movie) return;

    const newWatchedMovie: IWatchedMovie = {
      imdbID: movie.imdbID,
      Poster: movie.Poster,
      imdbRating: +movie.imdbRating,
      runtime: Number(movie.Runtime.split(' ').at(0)),
      Title: movie.Title,
      userRating: userRating,
      Year: movie.Year,
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  function handleUserRating(rating: number) {
    setUserRating(rating);
  }

  if (movie) {
    return (
      <div className="details">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <header>
              <button className="btn-back" onClick={onCloseMovie}>
                &larr;
              </button>
              <img src={movie.Poster} alt={`Poster of ${movie.Title}`} />
              <div className="details-overview">
                <h2>{movie.Title}</h2>
                <p>
                  {movie.Released} &bull; {movie.Runtime}
                </p>
                <p>{movie.Genre}</p>
                <p>
                  <span>⭐️</span>
                  {movie.imdbRating} IMDB Rating
                </p>
              </div>
            </header>
            <section>
              <div className="rating">
                {isWatched ? (
                  <p>You rated this movie with {watchedRating} stars!</p>
                ) : (
                  <>
                    <StarRating
                      maxRating={10}
                      size={24}
                      defaultRating={userRating}
                      onSetRating={handleUserRating}
                    />
                    {userRating > 0 && (
                      <button className="btn-add" onClick={handleAddToWatched}>
                        + Add to list
                      </button>
                    )}
                  </>
                )}
              </div>
              <p>
                <em>{movie.Plot}</em>
              </p>
              <p>Starring {movie.Actors}</p>
              <p>Directered by {movie.Director}</p>
            </section>
          </>
        )}
      </div>
    );
  } else {
    return <Loader />;
  }
}

export default MovieDetails;
