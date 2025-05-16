import { z } from "zod";

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  genre_ids: number[];
};

export const movieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string(),
  release_date: z.string(),
  genre_ids: z.array(z.number()),
});

export const moviesResponseSchema = z.object({
  page: z.number(),
  results: z.array(movieSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

// 型の定義
export type movieSchema = z.infer<typeof movieSchema>;
export type moviesResponseSchema = z.infer<typeof moviesResponseSchema>;
