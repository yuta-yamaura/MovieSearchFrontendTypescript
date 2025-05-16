import axios from "axios";
import { useEffect, useState } from "react";
import { type ValidYear } from "../components/atoms/SelectYear/SelectYear";
import { moviesResponseSchema, type Movie } from "../types/movies";

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

  const fetchSelectedYearMovies = async (page: number) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/movies/?year=${year}&page=${page}`
      );
      const result = moviesResponseSchema.safeParse(response.data);
      if (result.error) {
        throw new Error("無効なレスポンスです");
      }
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

  const fetchSelectedKeywordMovies = async (page: number) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/movies/?page=${page}&year=${year}&query=${query}`
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
  }, [currentPage]);

  useEffect(() => {
    fetchSelectedYearMovies(1);
  }, [year]);

  useEffect(() => {
    fetchSelectedKeywordMovies(1);
  }, [year]);

  return {
    movies,
    totalPages,
    currentPage,
  };
};
