import movie from "./assets/movie.jpeg";
import { useEffect, useState } from "react";
import Movie from "./Movies";
import searchimg from "./assets/search.png";
import Search from "./Search";

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
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchMovies, setSearchMovies] = useState([]);

  const fetchMovies = async () => {
    const endpoint = `${baseUrl}/discover/movie?sort_by=popularity.desc`;

    try {
      const response = await fetch(endpoint, API_OPTIONS);
      console.log(response);

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
  const movieSearch = async () => {
    try {
      const endpoint = `${baseUrl}/search/movie?query=${search}`;
      const response = await fetch(endpoint, API_OPTIONS);
      const data = await response.json();
      console.log(data);
      setSearchMovies(data.results);
    } catch {}
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  function handleChange(e) {
    setSearch(e.target.value);
    console.log(search);
  }
  function handleSubmit(e) {
    setIsSearching(true);
    e.preventDefault();
    movieSearch();
  }

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
          <form
            onSubmit={handleSubmit}
            className="flex  items-center justify-center gap-3"
          >
            <input
              value={search}
              onChange={handleChange}
              type="text"
              className="border-4 mt-2 block border-pink-500 rounded-full text-white w-1/3 p-3 text-1xl font-semibold text-center cursor-pointer focus:outline-none focus:ring-offset-fuchsia-600"
              placeholder="Search through millions of movies"
            />

            <button
              type="submit"
              className="bg-fuchsia-600 flex items-center p-2 rounded-full hover:scale-105 active:scale-95"
            >
              <img src={searchimg} alt="search-logo" className="h-10 w-10" />{" "}
              <span>Search</span>
            </button>
          </form>
        </section>
        {isSearching === false && (
          <div>
            <h2 className="text-pink-500 text-5xl mb-2 px-10">
              {" "}
              Trending Movies:
            </h2>
            {error && <p className="text-red-500">{error}</p>}

            <section className="flex flex-wrap px-10 gap-6">
              <Movie movies={movies} />
            </section>
          </div>
        )}
        {isSearching && <Search searchMovies={searchMovies} />}
      </main>
    </>
  );
}
