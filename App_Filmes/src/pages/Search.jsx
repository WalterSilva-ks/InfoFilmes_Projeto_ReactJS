import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'

const searchUrl = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY

import './MovieGrid.css'

const Search = () => {

    const [searchParams] = useSearchParams()
    const [movies, setMovie] = useState([])
    const query = searchParams.get('q');

    const getSearchedMovies = async (url) => {
        const res = await fetch(url)
        const data = await res.json()

        setMovie(data.results)
    }

    useEffect(() => {

        const searchWithQueryUrl = `${searchUrl}?${apiKey}&query=${query}`

        getSearchedMovies(searchWithQueryUrl)

    }, [query])


    return (
        <div className='container'>
            <h2 className="title">Resultados para: <span className='query-text'>{query}</span></h2><br />
            <div className="movies-container">
                {movies.length === 0 && <p>Carregando...</p>}
                {movies.length > 0 && movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </div>
    )
}

export default Search