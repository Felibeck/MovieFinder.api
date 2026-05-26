import { useEffect, useState } from "react";
import { fetchMovie, showFirst25 } from "../../services/omdb"
import MovieCard from "../MovieCard";

const MovieList = ({ titulo }) => {
    const [listaPelis, setListaPelis] = useState([])

    useEffect(() => {
        let mounted = true
        const load = async () => {
            try {
                if (!titulo) {
                    const res = await showFirst25()
                    if (mounted) setListaPelis(res || [])
                } else {
                    const res = await fetchMovie(titulo)
                    const items = res && res.Search ? res.Search : []
                    if (mounted) setListaPelis(items)
                }
            } catch (e) {
                if (mounted) setListaPelis([])
            }
        }
        load()
        return () => { mounted = false }
    }, [titulo])

    return (
        <>
            {listaPelis.map(e => (
                <MovieCard key={e.imdbID} poster={e.Poster} titulo={e.Title} anio={e.Year} tipo={e.Type} />
            ))}
        </>
    )
}

export default MovieList;