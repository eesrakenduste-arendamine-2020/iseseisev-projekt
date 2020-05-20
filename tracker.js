window.onload = function(){
    $('[data-menu-search]').addClass('active');
    selectContent();
};

import{APIKEY} from "../lamp.js"; 
let baseURL = 'https://api.themoviedb.org/3/';
const image_url = "https://image.tmdb.org/t/p/w185";
let configData = null;
let baseImageURL = null;
const search = document.querySelector("#search-button");
const input = document.querySelector("#search-input");

let getConfig = function () {
    let url = "".concat(baseURL, 'configuration?api_key=', APIKEY); 
    fetch(url)
    .then((result)=>{
        return result.json();
    })
    .then((data)=>{
        baseImageURL = data.images.secure_base_url;
        configData = data.images;
        console.log('config:', data);
        console.log('config fetched');
        //runSearch('jaws')
    })
    .catch(function(err){
        alert(err);
    });
}


//movie leht
function movieSection(movies){
    return movies.map((movie) => {
        if(movie.poster_path){
            return `<img src=${image_url + movie.poster_path} data-movie-id=${movie.id}/>`;
        }
    })
}

function createMovies(movies){
    const element = document.createElement("div");
    element.setAttribute("class", "movie");

    const template = `
        <section class="section">
            ${movieSection(movies)};
        </section>
        <div class="buttonToList">
            <button id="addToList">+My list</button>
        </div>
    `;  

    element.innerHTML = template;
    return element;
}

let getPopularMovies = function(){
    let url = "".concat(baseURL, 'movie/popular?api_key=', APIKEY, '&language=en-US');
    fetch(url)
    .then((result)=>{
        return result.json();
    })
    .then((data)=>{
        const movies = data.results;
        const movieBlock = createMovies(movies);
        document.getElementById("movies").appendChild(movieBlock);
    })
    .catch(function(err){
        alert(err);
    })
}


getPopularMovies();
getConfig();

//tvshow leht
function showSection(tvshows){
    return tvshows.map((show) => {
        return (`<img src=${image_url + show.poster_path} data-movie-id=${show.id}/>`);
    })
}

function createShows(tvshows){
    const element = document.createElement("div");
    element.setAttribute("class", "show");

    const template = `
        <section class="section">
            ${showSection(tvshows)}; 
        </section>
        <div class="buttonToList">
            <button id="addToList">+My list</button>
        </div>
    `; 

    element.innerHTML = template;
    return element;
}

function getPopularTVshows(){
    let url = "".concat(baseURL, 'tv/popular?api_key=', APIKEY, '&language=en-US&page=1');
    fetch(url)
    .then((result)=>{
        return result.json();
    })
    .then((data)=>{
        const tvshows = data.results;
        const showBlock = createShows(tvshows);
        document.getElementById("tv-shows").appendChild(showBlock);
    })
}

getPopularTVshows();


$("button").click(function() {
    document.getElementById("search-results").innerHTML='';
    if(this.id=="movie-search"){
        let inputValue = input.value;
        let url = "".concat(baseURL, "search/movie?api_key=", APIKEY, '&language=en-US&query=', inputValue);
        fetch(url)
        .then((result) =>{
            return result.json();
        })
        .then((data) =>{
            const searchResults = data.results;
            const searchBlock = createMovies(searchResults);
            document.getElementById("search-results").appendChild(searchBlock); 
        })

    }else if(this.id=="tv-show-search"){
        let inputValue = input.value;
        let url = "".concat(baseURL, "search/tv?api_key=", APIKEY, '&language=en-US&query=', inputValue);
        fetch(url)
        .then((result) =>{
            return result.json();
        })
        .then((data) =>{
            const searchResults = data.results;
            const searchBlock = createMovies(searchResults);
            document.getElementById("search-results").appendChild(searchBlock); 
        })
    }
});

//my listi lisamine



//klasside muutus
$('.menu-item').click(function(){
    $('.menu-item').removeClass('active');
    $(this).addClass('active');
    $('.menu').toggleClass('menu-active');
    selectContent();
});

function selectContent(){
    if($('[data-menu-search]').hasClass('active')){
        $('#movies').hide();
        $('#tv-shows').hide();
        $('#my-list').hide();
        $('#search').show();
        $('#search-results').show();
        document.getElementById("search-results").innerHTML=''; 
    } else if($('[data-menu-my-list]').hasClass('active')){ 
        $('#my-list').show();
        $('#movies').hide();
        $('#tv-shows').hide();
        $('#search').hide();
        $('#search-results').hide();
    } else if($('[data-menu-movies]').hasClass('active')){
        $('#my-list').hide();
        $('#movies').show();
        $('#tv-shows').hide();
        $('#search').hide();
        $('#search-results').hide();
    } else if($('[data-menu-tv-shows]').hasClass('active')){
        $('#my-list').hide();
        $('#movies').hide();
        $('#tv-shows').show();
        $('#search').hide();
        $('#search-results').hide();
    }
}

// { "popularity": 517.523, 
// "vote_count": 3420, 
// "video": false, 
// "poster_path": "/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg", 
// "id": 419704, 
// "adult": false, 
// "backdrop_path": "/5BwqwxMEjeFtdknRV792Svo0K1v.jpg", 
// "original_language": "en", 
// "original_title": "Ad Astra", 
// "genre_ids": [ 18, 878 ], 
// "title": "Ad Astra", 
// "vote_average": 6, 
// "overview": "The near future, a time when both hope and hardships drive humanity to look to the stars and beyond.
//  While a mysterious phenomenon menaces to destroy life on planet Earth, astronaut Roy McBride undertakes a mission across the immensity of space and its many perils to uncover
//   the truth about a lost expedition that decades before boldly faced emptiness and silence in search of the unknown.", 
//   "release_date": "2019-09-17" }