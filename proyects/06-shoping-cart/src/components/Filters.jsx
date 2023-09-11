import { useState, useId } from "react";
import "./Filters.css";

export function Filters({ onChange }) {
  //Creamos estado que nos permite saber donde esta y mostrarlo en el render
  const [minPrice, setMinPrice] = useState(0);
  const minPriceFilteredId = useId();
  const categoryFilterId = useId();

  const handleChangeMinPrice = (event) => {
    setMinPrice(event.target.value);
    //ESTO HUELE MAL
    //DOS FUENTES DE LA VERDAD
    onChange((prevState) => ({
      ...prevState,
      minPrice: event.target.value,
    }));
  };
  //ESTO HUELE MAL
  // Estamos pasando la funcion de actualizar estado
  //nativa de react a un component hijo
  const handleChangeCategory = (event) => {
    onChange((prevState) => ({
      ...prevState,
      category: event.target.value,
    }));
  };
  return (
    <section className="filters">
      <div>
        <label htmlFor={minPriceFilteredId}>Precio a partir de:</label>
        <input
          type="range"
          id={minPriceFilteredId}
          min="0"
          max="1000"
          onChange={handleChangeMinPrice}
        />
        <span>${minPrice}</span>
      </div>

      <div>
        <label htmlFor={categoryFilterId}>Categoría</label>
        <select name="" id={categoryFilterId} onChange={handleChangeCategory}>
          <option value="all">Todas</option>
          <option value="laptops">Portátiles</option>
          <option value="smartphones">Celulares</option>
        </select>
      </div>
    </section>
  );
}
