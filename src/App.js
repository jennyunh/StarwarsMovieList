import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
const [movies, setMovies] = useState([]);

  
const fetchMoviesHandler = () => {
  //fetch default is GET request. This function fetches data in the future (async), 
  //THEN when it gets the data, it will perform a function with the response. 
  //Response is in JSON format, so the response.json() changes it to regular js.
  //the response.json() returns another promise.
  //THEN when the data transformation from json to js is done,
  //
  fetch('https://swapi.dev/api/films').then(
    response => {return response.json().then(
      data => {console.log(data.results);
        const transformedMovies = data.results.map(moviedata => {
          return {id: moviedata.episode_id,
          title: moviedata.title,
          openingText: moviedata.opening_crawl,
          releaseDate: moviedata.release_date
          }
        });
      setMovies(transformedMovies);
      }
    )}
  );
}


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
