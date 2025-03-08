export default function Movie({ movies }) {
  return (
    <>
      {movies.map((movie) => {
        return (
          <div
            className="movie-card hover:scale-105 duration-75 ease-in-out mt-2 mb-2"
            key={movie.id}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt=""
              className="w-75"
            />
            <p className="text-white mt-3 text-[1rem]">{movie.title}</p>
            <p className="text-red-300 mt-3">Rating: {movie.vote_average}</p>
          </div>
        );
      })}
      ;
    </>
  );
}
