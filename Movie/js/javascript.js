const API_KEY = "api_key=293af8cb4ca7d7dc9c9820b437b18ce0";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;

const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const main = document.querySelector(".main");
const form = document.getElementById("form");
const search = document.getElementById("search");
let data=[];

getMovie(API_URL);

function getMovie(url) {
  fetch(url)
    .then((res) => res.json())
    .then(data => {
      console.log(data);
      showMovies(data.results);
    });
}
function showMovies(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const MovieElement = document.createElement("div");
    MovieElement.classList.add("movieCard-div");
    MovieElement.innerHTML = `
                    <div>
                        <img src="${IMG_URL + poster_path}" alt="${title}">
                    </div>
                    <div class="moviecard-Title">
                        <h3>${title}</h3>
                        <span class="movie-rating ${getColor(
                          vote_average
                        )}">${vote_average}</span>
                    </div>
                    <div class="Movie-detail-text">
                        DETAILS
                        <div class="moviecard-details">
                            <img src="${
                              IMG_URL + poster_path
                            }" width="50px" height="100%">
                           ${overview};
                            
                        </div>
                    </div>
                    </div>
    
    `;
    main.appendChild(MovieElement);
  });
}
function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
form.addEventListener('keyup', (e) => {
e.preventDefault();
     const searchValue = search.value;
  if (searchValue) {
    getMovie(searchURL + "&query=" + searchValue);
  } else {
    getMovie(API_URL);
  }

});
