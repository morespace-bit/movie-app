import React from "react";

export default function Search({ searchMovies }) {
  return (
    <>
      <section className="flex px-15 flex-wrap gap-6 w-full mt-7">
        {searchMovies.map((movie) => {
          return (
            <>
              <div
                key={movie.id}
                className="movie-card w-80 h-130 mb-5 hover:scale-105 duration-75 ease-in-out"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt="search-movie"
                />

                <p className="text-xl text-white font-semibold">
                  {movie.title}
                </p>
              </div>
            </>
          );
        })}
      </section>
    </>
  );
}
