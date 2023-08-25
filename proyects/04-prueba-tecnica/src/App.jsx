import React, { useEffect, useState } from "react";
import "./App.css";

const CAT_ENDPOINT_RANDOM_FACT = `https://catfact.ninja/fact`;
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`;
const CAT_PREFIX_IMAGE_URL = "https://cataas.com";

export function App() {
  const [fact, setFact] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [facterror, setFactError] = useState()

  //Efecto para recuperar la cita al cargar la pàgina
  useEffect(() => {
    //Este fetch devuelve una promesa
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      //devuelve una promesa
      .then((res) => {
        //TODO: Handle error if !res.ok
        return res.json()
      })
      .then((data) => {
        const { fact } = data;
        setFact(fact);
      });
  }, []);

  //Efecto para recuperar la imagen cada vez que tenemos una cita nueva
  useEffect(() => {
    if(!fact) return
    //conseguimos las 3 primeras palabras
    const threeFirstWords = fact.split(" ", 3).join(" ");
    console.log(threeFirstWords);

    fetch(
      `https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        // console.log(response);
        const { url } = response;
        setImageUrl(url);
      });
  },[fact]);

  return (
    <main>
      <h1>App de gatitos</h1>
      {fact && <p> {fact} </p>}
      {imageUrl && (
        <img
          src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`}
          alt={`Image extrated using the first three words for ${fact}`}
        />
      )}
    </main>
  );
}
