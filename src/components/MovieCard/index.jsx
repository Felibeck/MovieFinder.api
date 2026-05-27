const MovieCard = ({ poster, titulo, anio, tipo, onSelectMovie }) => {
    return (
        <div className="movie-card" onClick={() => onSelectMovie?.(titulo)}>
            {poster && poster !== 'N/A'
                ? <img src={poster} alt={titulo} />
                : <div className="movie-card-no-poster">🎬</div>
            }
            <div className="movie-card-info">
                <p className="movie-card-title">{titulo}</p>
                <div className="movie-card-meta">
                    <span>{anio}</span>
                    {tipo && <span className="movie-card-type">{tipo}</span>}
                </div>
            </div>
        </div>
    )
}

export default MovieCard