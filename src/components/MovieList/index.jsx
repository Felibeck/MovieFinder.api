import { useEffect, useState } from "react";
import { fetchMovie, showFirst25 } from "../../services/omdb"
import MovieCard from "../MovieCard";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";

const MovieList = ({ titulo, onSelectMovie }) => {
    const [listaPelis, setListaPelis] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        let mounted = true
        const load = async () => {
            try {
                if (mounted) {
                    setLoading(true)
                    setError(false)
                }

                if (!titulo) {
                    const res = await showFirst25()
                    if (mounted) setListaPelis(res || [])
                } else {
                    const res = await fetchMovie(titulo)
                    if (res && res.Response === "False") {
                        if (mounted) {
                            setListaPelis([])
                            setError(true)
                        }
                        return
                    }
                    const items = res && res.Search ? res.Search : []
                    if (mounted) setListaPelis(items)
                }
            } catch (e) {
                if (mounted) {
                    setListaPelis([])
                    setError(true)
                }
            } finally {
                if (mounted) setLoading(false)
            }
        }
        load()
        return () => { mounted = false }
    }, [titulo])

    return (
        <>
            {loading && <Loader />}
            {!loading && error && <ErrorMessage />}
            <div className="movie-grid">
                {!loading && !error && listaPelis.map(e => (
                    <MovieCard
                        key={e.imdbID}
                        poster={e.Poster}
                        titulo={e.Title}
                        anio={e.Year}
                        tipo={e.Type}
                        onSelectMovie={onSelectMovie}
                    />
                ))}
            </div>
            {!loading && !error && listaPelis.length === 0 && titulo && (
                <p className="no-results">No se encontraron resultados para "{titulo}"</p>
            )}
        </>
    )
}

export default MovieList;