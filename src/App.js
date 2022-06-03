import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
const [movies, setMovies] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);

  
const fetchMoviesHandler = async () => {

//set isLoading to true
setIsLoading(true);
setError(null);

  //fetch default is GET request. This function fetches data in the future (async), 
  //THEN when it gets the data, it will perform a function with the response. 
  //Response is in JSON format, so the response.json() changes it to regular js.
  //the response.json() returns another promise.
  //THEN when the data transformation from json to js is done,
  /*
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
      setIsLoading(false)
      }
    )}
  );
*/

  /*ALTERNATIVE VERSION IS USING ASYNC AND AWAIT: 
  async function fetchMoviesHandler() {
    const response = await fetch('')
    const data = await response.json();
  }
  */

try {
  const response = await fetch('https://swapi.dev/api/films');
  if (!response.ok) {
    throw new Error("SOMETHING WENT WRONG");
  }

  const data = await response.json();
  const transformedMovies = data.results.map((movieData) => {
    return {
      id: movieData.episode_id,
      title: movieData.title,
      openingText: movieData.opening_crawl,
      releaseData: movieData.release_date
    };
  });
  setMovies(transformedMovies);
}
//error in this case is the string "SOMETHING WENT WRONG"
catch (error) {
  setError(error.message)
}
setIsLoading(false); 

}

let content = "Found No Movies";

if (movies.length > 0) {
  content = <MoviesList movies={movies}/>;
}

if (error) {
  content = <p>{error}</p>
}

if (isLoading) {
  content = <p>LOADING....</p>
}


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
     {content}
      </section>
    </React.Fragment>
  );
}

export default App;
