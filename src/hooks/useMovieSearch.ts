import axios from "axios";
import { useEffect, useState } from "react";
import { type ValidYear } from "../components/atoms/SelectYear/SelectYear";
import type { Movie } from "../types/movies";

type MovieSearchProps = {
  year: ValidYear;
  query: string;
  currentPage: number;
};

export const useMovieSearch = ({
  year,
  query,
  currentPage,
}: MovieSearchProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage, year]);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [query]);

  const fetchMovies = async (page: number) => {
    try {
      const params = new URLSearchParams({
        year,
        query: page.toString(),
        ...(query && { query }),
      });

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/movies/?${params}`
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

  return {
    movies,
    totalPages,
    currentPage,
  };
};
