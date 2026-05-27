const MovieDetail = ({tituloCompleto, poster, anio, genero, director, actoresMain, sinopsis, duracion, idioma, pais, puntajeIMDB}) =>
{

const safe = (val) => (!val || val === 'N/A') ? null : val

return (
  <div className="detail-layout">
    <div>
      {safe(poster)
        ? <img src={poster} alt={tituloCompleto} className="detail-poster" />
        : <div className="detail-no-poster">🎬</div>
      }
    </div>
    <div className="detail-info">
      <h2 className="detail-title">{tituloCompleto}</h2>
      {safe(puntajeIMDB) && <div className="detail-rating">{puntajeIMDB} IMDb</div>}
      <div className="detail-meta-row">
        {safe(anio) && <span className="detail-badge">{anio}</span>}
        {safe(duracion) && <span className="detail-badge">{duracion}</span>}
        {safe(idioma) && <span className="detail-badge">{idioma}</span>}
        {safe(pais) && <span className="detail-badge">{pais}</span>}
      </div>
      {safe(genero) && (
        <div className="detail-section">
          <span className="detail-label">Género</span>
          <span className="detail-value">{genero}</span>
        </div>
      )}
      {safe(director) && (
        <div className="detail-section">
          <span className="detail-label">Director</span>
          <span className="detail-value">{director}</span>
        </div>
      )}
      {safe(actoresMain) && (
        <div className="detail-section">
          <span className="detail-label">Reparto</span>
          <span className="detail-value">{actoresMain}</span>
        </div>
      )}
      {safe(sinopsis) && <p className="detail-plot">{sinopsis}</p>}
    </div>
  </div>
)
}

export default MovieDetail