import React, { useEffect, useState } from 'react'

const CAT_ENDPOINT_RANDOM_FACT = `https://catfact.ninja/fact`;
const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`;

export function App() {
const [fact, setFact] = useState()

useEffect(()=>{
    fetch(CAT_ENDPOINT_RANDOM_FACT)
        .then(res => res.json())
        .then(data => {
            const {fact} = data
            setFact(fact)
            //conseguimos las 3 primeras palabras
            const threeFirstWords = fact.split(' ', 3)
            console.log(threeFirstWords);
        })

    fetch(CAT_ENDPOINT_IMAGE_URL)
    .then(res => res.json()
    .then(response => {
      console.log(response);
    }))
},[])
  return (
    <main>
        <h1>App de gatitos</h1>
        {fact && <p> {fact} </p>}
    </main>
  )
}
