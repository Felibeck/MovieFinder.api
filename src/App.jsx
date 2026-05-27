import { useEffect, useState } from 'react'
import './App.css'
import { fetchMovieDetail } from './services/omdb'
import SearchBar from './components/SearchBar'
import MovieList from './components/MovieList'
import Loader from './components/Loader'
import ErrorMessage from './components/ErrorMessage'
import MovieDetail from './components/MovieDetail'

function App() {
  const [word, setWord] = useState('')
  const [debouncedWord, setDebouncedWord] = useState('')

  const [tituloSeleccionado, setTituloSeleccionado] = useState(null)
  const [detail, setDetail] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState(false)

  const cerrarModal = () => {
    setTituloSeleccionado(null)
    setDetail(null)
    setDetailError(false)
  }

  useEffect(() => {
    const t = setTimeout(() => setDebouncedWord(word), 500)
    return () => clearTimeout(t)
  }, [word])

  useEffect(() => {
    if (!tituloSeleccionado) return
    let mounted = true

    const load = async () => {
      try {
        if (mounted) {
          setDetailLoading(true)
          setDetailError(false)
          setDetail(null)
        }
        const res = await fetchMovieDetail(tituloSeleccionado)
        if (!mounted) return
        if (res && res.Response === 'False') {
          setDetail(null)
          setDetailError(true)
          return
        }
        setDetail(res)
      } catch {
        if (mounted) {
          setDetail(null)
          setDetailError(true)
        }
      } finally {
        if (mounted) setDetailLoading(false)
      }
    }

    load()
    return () => { mounted = false }
  }, [tituloSeleccionado])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') cerrarModal()
    }
    if (tituloSeleccionado) window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [tituloSeleccionado])

  return (
    <>
      <div className="app-header">
        <h1 className="app-title">Movie<span>Finder</span></h1>
        <span className="app-subtitle">Base de datos cinematográfica</span>
      </div>

      <SearchBar setWord={setWord} />
      <MovieList titulo={debouncedWord} onSelectMovie={setTituloSeleccionado} />

      {tituloSeleccionado && (
        <div className="modal-backdrop" onClick={cerrarModal}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <button type="button" className="modal-close" onClick={cerrarModal} aria-label="Cerrar">
                ×
              </button>
            </div>
            <div className="modal-body">
              {detailLoading && <Loader message="Cargando detalle..." />}
              {!detailLoading && detailError && <ErrorMessage />}
              {!detailLoading && !detailError && detail && (
                <MovieDetail
                  tituloCompleto={detail.Title}
                  poster={detail.Poster}
                  anio={detail.Year}
                  genero={detail.Genre}
                  director={detail.Director}
                  actoresMain={detail.Actors}
                  sinopsis={detail.Plot}
                  duracion={detail.Runtime}
                  idioma={detail.Language}
                  pais={detail.Country}
                  puntajeIMDB={detail.imdbRating}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
