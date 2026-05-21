import { useEffect } from "react";
import { showFirst25 } from "../services/omdb"
import MovieCard from "../MovieCard";
import { fetchMovie } from "../../services/omdb";


const MovieList = ({ titulo }) => {

    let listaPelis = [];

    if (titulo == "") {
        listaPelis = showFirst25();
    }
    else {
        listaPelis = fetchMovie(titulo);
    }

    return (
        <>
            {
                listaPelis.map(e => <MovieCard poster={e.poster} titulo={e.titulo} anio={e.anio} tipo={e.tipo} />)
            }
        </>
    )
}

export default MovieList;