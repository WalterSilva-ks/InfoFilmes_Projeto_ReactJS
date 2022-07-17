
import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard';
import './MovieGrid.css'

const movieURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {

    const [topMovie, setTopMovie] = useState([]);

    const getTopRatedMovies = async (url) => {
        const res = await fetch(url)
        const data = await res.json()

        setTopMovie(data.results)
    }

    useEffect(() => {

        const topRatedUrl = `${movieURL}top_rated?${apiKey}`

        getTopRatedMovies(topRatedUrl)

    }, [])

    return (
        <div className='container' >
            <h2 className="title">Melhores Filmes:</h2><br />
            <div className="movies-container">
                {topMovie.length === 0 && <p>Carregando...</p>}
                {topMovie.length > 0 && topMovie.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </div>
    )
}

export default Home