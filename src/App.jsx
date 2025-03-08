import movie from "./assets/movie.jpeg";
import { useEffect, useState } from "react";
import Movie from "./Movies";

const baseUrl = "https://api.themoviedb.org/3";

// Use the environment variable to access the API key
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`, // Fetch the key securely from the .env file
  },
};

export default function App() {
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const endpoint = `${baseUrl}/discover/movie?sort_by=popularity.desc`;

    try {
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setMovies(data.results); // Store fetched movies
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching the movies.");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <main>
        <header>
          <img src={movie} alt="movie-poster" className="h-75" />
          <h1>
            Find the <span className="text-gradient">Movies</span> for your
            <span className="text-fuchsia-600"> Entertainment</span>
          </h1>
        </header>
        <section className="px-10 w-full">
          <input
            type="text"
            className="border-4 mt-2 block border-pink-500 rounded-full text-white w-1/3 p-3 text-1xl font-semibold text-center cursor-pointer focus:outline-none focus:ring-offset-fuchsia-600 mx-auto"
            placeholder="Search through millions of movies"
          />
          <h2 className="text-pink-500 text-5xl mb-2"> Trending Movies:</h2>
          {error && <p className="text-red-500">{error}</p>}
        </section>
        <section className="flex flex-wrap px-10 gap-6">
          <Movie movies={movies} />
        </section>
      </main>
    </>
  );
}
