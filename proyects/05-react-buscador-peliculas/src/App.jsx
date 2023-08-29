import "./App.css";
import { useMovies } from "./hooks/useMovies.js";
import { Movies } from "./components/Movies";
import { useEffect, useState,  } from "react";

function useSearch() {
  const [search, updatedSearch] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
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
  return { search, updatedSearch, error}
}

function App() {
  const { movies } = useMovies();
  const { search, updatedSearch, error} = useSearch()
  

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ search });
  };

  const handleChange = (event) => {
    updatedSearch(event.target.value);
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de Peliculas</h1>
        <form action="" className="form" onSubmit={handleSubmit}>
          <input style={{border: '1px solid transparent', borderColor: error ? 'red' : 'transparent' }}
            onChange={handleChange}
            value={search}
            name="query"
            type=""
            placeholder="Avengers, Star Wars, the Matrix ..."
          />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
