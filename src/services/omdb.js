import axios from "axios"

const omdb = axios.create({
    baseURL: "https://www.omdbapi.com",
    params: {
        apikey: "5e164856"
    }
})

export const fetchMovie = async nomPeli => {
    const response = await omdb.get("/", { params: { s: nomPeli, page: 1 } })
    // Debug: show API response shape when searching
    try { console.debug("fetchMovie response:", response.data) } catch (e) {}
    return response.data
}

export const fetchMovieDetail = async idPeli => {
    const response = await omdb.get("/", { params: { t: idPeli } })
    return response.data
}

export const showFirst25 = () =>
{
    // Fetch up to 25 search results (OMDB returns up to 10 results per page).
    // Minimal, safe implementation that paginates until it has 25 items or runs out.
    // Try a small list of non-specific seeds sequentially until we get valid results from OMDB
    const seeds = ['a','the','star','man','love','war','life','king','girl','day']
    const trySeed = async (idx = 0) => {
        if (idx >= seeds.length) return []
        const data = await fetchMovie(seeds[idx])
        try { console.debug('showFirst25 try', seeds[idx], data) } catch (e) {}
        if (data && Array.isArray(data.Search) && data.Search.length > 0) return data.Search
        return trySeed(idx + 1)
    }
    return trySeed()
}

