import axios from "axios"

const omdb = axios.create(
    {
        baseURL:"http://www.omdbapi.com",
        params: 
        {
            apikey: "5e164856",
            s: nomPeli
        }
    }
)

const fetchMovie = nomPeli =>
{   
    return omdb.get(`${nomPeli}`)
    .then((response)=> {
        return response.data
    })
}

