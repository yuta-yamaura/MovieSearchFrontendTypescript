import type { Movie } from "../../../types/movies";
import { MovieCard } from "../MovieCard/MovieCard";
import "./MovieList.css";

type MovieListProps = {
  movies: Movie[];
};

export const MovieList = ({ movies }: MovieListProps) => {
  return (
    <div className="movie-grid">
      {movies?.length === 0 ? (
        <div className="no-results">
          <p>ヒットしませんでした</p>
        </div>
      ) : (
        movies?.map((movie) => <MovieCard movie={movie} />)
      )}
    </div>
  );
};
