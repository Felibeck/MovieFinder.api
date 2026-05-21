import { useState } from "react"

const SearchBar = ({setWord}) =>
{
    
    return (
        <form id="search">
        <input type="text" placeholder="Busca tu pelicula favorita" onKeyUp={setWord(target.value)}/>
        </form>
    )
}

export default SearchBar