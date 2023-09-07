import { searchMovies } from "../services/movies.js";
import { useRef, useState, useMemo, useCallback } from "react";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Utilizamos el useRef para guardar la busqueda anterior que habiamos generado
  const previusSearch = useRef(search);

  //Forma de recuperar las peliculas llamamos lo que devuelve el movies.js (Servicio)
  const getMovies = useCallback(async ({ search }) => {
    if (search === previusSearch.current) return;

    try {
      setLoading(true);
      setError(null);
      previusSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (e) {
      setError(e.message);
    } finally {
      //EL finally siempre se va ejecutar tanto si se comple el try como el catch
      setLoading(false);
    }
  }, []);

  const sortedMovies = useMemo(() => {
    // console.log('MemoSortedMovies');
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);
  return { movies: sortedMovies, getMovies, loading };
}
