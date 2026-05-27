const MovieCard = ({ poster, titulo, anio, tipo, onSelectMovie }) => {
    return (
       <div>
           <h1>{titulo}</h1>
           <img
             src={poster}
             alt="Poster"
             style={{ cursor: onSelectMovie ? "pointer" : undefined }}
             onClick={() => onSelectMovie?.(titulo)}
           />
           <h3>{anio}</h3>
           <h3>{tipo}</h3>
       </div>
    )
}

export default MovieCard