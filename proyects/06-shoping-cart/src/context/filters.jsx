import { createContext, useState } from "react";
//Singleton -> Modulo de JavaScript

//1. Crear el contexto
//Este es el que tenemos que consumir
export const FiltersContext = createContext();

//2. Crear el provider para proover el contexto
//Este es el que nos provee el acceso al contexto
export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState({
    category: "all",
    minPrice: 0,
  })
  return (
    <FiltersContext.Provider
      value={{
        filters,
        setFilters
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
