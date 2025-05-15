import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { LoadMoreButton } from "../../atoms/LoadMoreButton/LoadMoreButton";
import { SelectYear } from "../../atoms/SelectYear/SelectYear";
import { SearchInput } from "../../atoms/SearchInput/SearchInput";
import { MovieList } from "../../molecules/MovieList/MovieList";
import "./MovieSearch.css";
import type { Movie } from "../../../types/movies";

export const MovieSearchYear = () => {
  const { year: yearParam } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedYear, setSelectedYear] = useState(yearParam || "2024");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchSelectedYearMovies = async (page: number) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/movies/?year=${yearParam}&page=${page}`
      );
      const data = response.data;

      if (page === 1) {
        setMovies(data.results);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
      }
      // 最後のページ数をセット
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchSelectedYearMovies(currentPage);
  }, [yearParam, currentPage]);

  const loadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value;
    setSelectedYear(year);
    navigate(`/${year}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <h1>Search Movie App</h1>
      <div className="search-container">
        <SearchInput
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
        />
        <SelectYear
          selectedYear={selectedYear}
          handleYearChange={handleYearChange}
        />
      </div>
      <MovieList movies={movies} />

      {movies.length > 0 && currentPage < totalPages && (
        <LoadMoreButton loadMore={loadMore} />
      )}
    </div>
  );
};
