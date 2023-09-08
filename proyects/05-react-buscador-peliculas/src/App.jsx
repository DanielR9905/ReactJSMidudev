import "./App.css";
import { useMovies } from "./hooks/useMovies.js";
import { Movies } from "./components/Movies";
import { useEffect, useState, useRef, useCallback } from "react";
import debounce from "just-debounce-it";

function useSearch() {
  const [search, updatedSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }
    if (search === "") {
      setError("No se puede buscar una película vacia");
      return;
    }
    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una película con un numero");
      return;
    }
    if (search.length < 3) {
      setError("La busqueda debe tener al menos 3 caracteres");
      return;
    }
    setError(null);
  }, [search]);
  return { search, updatedSearch, error };
}

function App() {
  const [sort, setSort] = useState(false);
  const { search, updatedSearch, error } = useSearch();
  const { movies, loading, getMovies } = useMovies({ search, sort });

  const debouncedGetMovies = useCallback(
    debounce( search => {
      console.log('search', search);
      getMovies({search})
    }, 300)
  , [getMovies]
  ) 

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  const handleSort = () => {
    setSort(!sort);
  };

  const handleChange = (event) => {
    const newSearch = event.target.value
    updatedSearch(newSearch);
    debouncedGetMovies(newSearch)
  };

  useEffect(() => {
    console.log("new GetMovies Received");
  }, [getMovies]);

  
  return (
    <div className="page">
      <header>
        <h1>Buscador de Peliculas</h1>
        <form action="" className="form" onSubmit={handleSubmit}>
          <input
            style={{
              border: "1px solid transparent",
              borderColor: error ? "red" : "transparent",
            }}
            onChange={handleChange}
            value={search}
            name="query"
            type=""
            placeholder="Avengers, Star Wars, the Matrix ..."
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      <main>
        {loading ? <p>Cargando ... 🕣 </p> : <Movies movies={movies} />}
      </main>
    </div>
  );
}

export default App;
