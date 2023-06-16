import { useEffect, useState } from 'react';
import { IMovieDetails } from '../types/types';
import Loader from './Loader';
import StarRating from './StarRating';

interface MovieDetailsProps {
  selectedId: string;
  onCloseMovie(): void;
}

function MovieDetails({ selectedId, onCloseMovie }: MovieDetailsProps) {
  const [movie, setMovie] = useState<IMovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
                <StarRating maxRating={10} size={24} />
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
