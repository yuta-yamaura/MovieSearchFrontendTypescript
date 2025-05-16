import { useState } from "react";
import { LoadMoreButton } from "../../atoms/LoadMoreButton/LoadMoreButton";
import {
  SelectYear,
  yearSchema,
  type ValidYear,
} from "../../atoms/SelectYear/SelectYear";
import { SearchInput } from "../../atoms/SearchInput/SearchInput";
import { MovieList } from "../../molecules/MovieList/MovieList";
import "./MovieSearch.css";
import { useMovieSearch } from "../../../hooks/useMovieSearch";
import { useNavigate } from "react-router-dom";

export const MovieSearch = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState<ValidYear>("2023");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { movies, totalPages } = useMovieSearch({
    year: selectedYear,
    query: searchQuery,
    currentPage: currentPage,
  });

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const resultYear = yearSchema.safeParse(e.target.value);
    if (resultYear.success) {
      setSelectedYear(resultYear.data);
      navigate(`/${resultYear.data}`);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const resultYear = yearSchema.safeParse(e.target.value);
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      navigate(`/${resultYear.data}/${query}`);
    } else {
      navigate(`/${resultYear.data}`);
    }
  };

  const loadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
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

      {movies?.length > 0 && currentPage < totalPages && (
        <LoadMoreButton loadMore={loadMore} />
      )}
    </div>
  );
};
