const MovieDetail = ({tituloCompleto, poster, anio, genero, director, actoresMain, sinopsis, duracion, idioma, pais, puntajeIMDB}) =>
{


    return (
       <>
       
       <h1>{tituloCompleto}</h1>
       <img src={poster} alt="Poster" />
       <h4>{anio}</h4>
       <h4>{genero}</h4>
       <h4>{director}</h4>
       <h4>{actoresMain}</h4>
       <h4>{sinopsis}</h4>
       <h4>{duracion}</h4>
       <h4>{idioma}</h4>
       <h4>{pais}</h4>
       <h4>{puntajeIMDB}</h4>
       </>
    )
}

export default MovieDetail