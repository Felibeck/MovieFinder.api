import axios from "axios"

const omdb = axios.create(
    {
        baseURL:"http://www.omdbapi.com",
        params: 
        {
            apikey: "5e164856",
            s: nomPeli,
            page: 1,
            t: idPeli
        }
    }
)

export const fetchMovie = nomPeli =>
{   
    return omdb.get(`${nomPeli}`)
    .then((response)=> {
        return response.data
    })
}

export const showFirst100 = () =>
{
    let listaPelis = [];
    for(let idPeli = 0; idPeli< 50; idPeli++)
    {
        return omdb.get(`${idPeli}`)
        .then((response)=> {
        listaPelis.push(response.data);
    })
    }
    return listaPelis
}

