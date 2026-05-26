

const Loader = () =>
{
    const [loader, setLoader] = useState("Cargando...")

    return (
        <div className="loader">
            <p>{loader}</p>
        </div>
    )
}

export default Loader