import { useEffect, useState } from 'react'
import './App.css'
import { fetchMovie } from './services/omdb'

function App() {

  const [word, setWord] = useState("") 

useEffect(() => {
    const temporizador = setTimeout(() => {
        fetchMovie(word)
    }, 500)

    return () => clearTimeout(temporizador)
}, [word])

  return (
    <>
    <SearchBar setWord = {setWord}/>

    <MovieList titulo = {word}/>

    </>
  )
}

export default App
