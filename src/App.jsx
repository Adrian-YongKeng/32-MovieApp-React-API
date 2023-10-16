import { useState, useEffect } from "react";
import axios from 'axios';


export default function App() {
  const [movieTitle, setMovieTitle] = useState("");
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (movieTitle) {
      setLoading(true);
      fetchMovieByTitle(movieTitle)
        .then((data) => setMovieData(data))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false))
    }
  }, [movieTitle]);

  //const API_URL = "https://www.omdbapi.com/?apikey=258a2345"

  async function fetchMovieByTitle(title) {
    const apiKey = "294d189e"
    const encodedTitle = encodeURIComponent(title);
    const response = await axios.get(`https://www.omdbapi.com/?t=${encodedTitle}&apikey=${apiKey}`);
    // const response = await axios.get(`${API_URL}&t=${encodedTitle}`);
    return response.data;
  }

  function selectMovie(event) {
    setMovieTitle(event.target.value);
  }

  return (
    <div>
      <h1>Movie App 🍿</h1>
      <input
        type="text"
        value={movieTitle}
        placeholder="Enter Movie Title"
        onChange={selectMovie}
        style={{ marginRight: "10px", marginBottom: "5px", width: "230px" }}
      />

      <select value={movieTitle} onChange={selectMovie} style={{ width: '180px' }}>
        <option value="">-Select Movie Title-</option>
        <option value="Guardians of the Galaxy Vol. 2">Guardians of the Galaxy Vol. 2</option>
        <option value="Iron Man">Iron Man</option>
        <option value="The Avengers">The Avengers</option>
        <option value="Black Panther">Black Panther</option>
        <option value="Batman Forever">Batman Forever</option>
        <option value="Batman & Robin">Batman & Robin</option>
        <option value="Batman Returns">Batman Returns</option>
        <option value="The Lego Batman Movie">The Lego Batman Movie</option>
        <option value="Batman: The Animated Series">Batman: The Animated Series</option>
        <option value="Batman v Superman: Dawn of Justice (Ultimate Edition)">Batman v Superman</option>
        <option value="The Batman">The Batman</option>
        <option value="Batman Begins">Batman Begins</option>

        <option value="Superman Returns">Superman Returns</option>
        <option value="Superman II">Superman II</option>
        <option value="Superman II">Superman II</option>
        <option value="Superman III">Superman III</option>
        <option value="Superman IV: The Quest for Peace">Superman IV</option>
        <option value="Superman & Lois">Superman & Lois</option>

        <option value="The Amazing Spiderman 2 Webb Cut">The Amazing Spiderman 2 Webb Cut</option>
        <option value="Spiderman the Verse">Spiderman the Verse</option>
        <option value="Spiderman and Grandma">Spiderman and Grandma</option>
        <option value="Fighting, Flying and Driving: The Stunts of Spiderman 3">Fighting, Flying and Driving: The Stunts of Spiderman 3</option>
      </select>

      {loading && <p>Loading...</p>}

      {movieData && movieData.Title && (
        <div>
          <h2>{movieData.Title}</h2>

          <img src={movieData.Poster} alt={movieData.Title} />
          <p>{movieData.Plot}</p>
        </div>
      )}
    </div>
  )
}
