import type { Movie } from "../../../types/movies";
import { getGenreNames } from "../Genre/Genre";
import "./MovieCard.css";

type MovieListProps = {
  movie: Movie;
};

export const MovieCard = ({ movie }: MovieListProps) => {
  return (
    <div className="movie-card">
      <h3>{movie.title}</h3>
      <img
        src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.release_date}</p>
      <p>{getGenreNames(movie.genre_ids)}</p>
    </div>
  );
};
