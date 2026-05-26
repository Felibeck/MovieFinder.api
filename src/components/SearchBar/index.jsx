const SearchBar = ({ setWord }) => {
    return (
        <form id="search" onSubmit={e => e.preventDefault()}>
            <input type="text" placeholder="Busca tu pelicula favorita" onChange={e => setWord(e.target.value)} />
        </form>
    )
}

export default SearchBar