window.onload = function(){
    $('[data-menu-search]').addClass('active');
    selectContent();
};

import{APIKEY} from "../lamp.js"; 
const image_url = "https://image.tmdb.org/t/p/w185";
let configData = null;
let baseImageURL = null;
const search = document.querySelector("#search-button");
const input = document.querySelector("#search-input");

let getConfig = function () {
    const path = 'configuration?api_key=';
    let url = generateUrl(path) + APIKEY;
    fetch(url)
    .then((result)=>{
        return result.json();
    })
    .then((data)=>{
        baseImageURL = data.images.secure_base_url;
        configData = data.images;
        console.log(configData);
    })
    .catch(function(err){
        alert(err);
    });
}

function generateUrl(path){
    const url = `https://api.themoviedb.org/3/${path}`;
    return url;
}

//movie leht
function createSection(elements){
    const section = document.createElement("section");
    section.classList = "section";

    elements.map((element) => {
        if(element.poster_path){
            const img = document.createElement("img");
            img.src = image_url + element.poster_path;
            img.id = element.id;
            section.appendChild(img);
        }
    })

    return section;
}

function createElements(elements){
    const element = document.createElement("div");
    element.setAttribute("class", "movie");

    const content = document.createElement("div");
    content.classList = "content";

    const contentClose = `<p id='content-close'>X</p>
        <button class = "listButton">+ My list</button>`;

    //const button = `<button class = "listButton">+ My list</button>`;

    content.innerHTML = contentClose;

    const section = createSection(elements);

    element.appendChild(section);
    element.appendChild(content);
    return element;
}

let getPopularMovies = function(){
    const path = 'movie/popular?api_key=';
    let url = generateUrl(path) + APIKEY;
    fetch(url)
    .then((result)=>{
        return result.json();
    })
    .then((data)=>{
        const elements = data.results;
        const block = createElements(elements);
        document.getElementById("movies").appendChild(block);
    })
    .catch(function(err){
        alert(err);
    })
}


getPopularMovies();
getConfig();

//tvshow leht
function getPopularTVshows(){
    const path = 'tv/popular?api_key=';
    let url = generateUrl(path) + APIKEY;
    fetch(url)
    .then((result)=>{
        return result.json();
    })
    .then((data)=>{
        const elements = data.results;
        const block = createElements(elements);
        document.getElementById("tv-shows").appendChild(block);
    })
}

getPopularTVshows();

//search

function renderElements(data){
    document.getElementById("search-results").innerHTML='';
    const searchResults = data.results;
    const searchBlock = createElements(searchResults);
    document.getElementById("search-results").appendChild(searchBlock);
}

$("button").click(function() {
    if(this.id=="movie-search"){
        const inputValue = input.value;
        const path = 'search/movie?api_key=';
        let url = generateUrl(path) + APIKEY + '&query=' + inputValue;
        fetch(url)
        .then((result) =>{
            return result.json();
        })
        .then(renderElements)

    }else if(this.id=="tv-show-search"){
        let inputValue = input.value;
        const path = 'search/tv?api_key=';
        let url = generateUrl(path) + APIKEY + '&query=' + inputValue;
        fetch(url)
        .then((result) =>{
            return result.json();
        })
        .then(renderElements)
    }
});


//my listi lisamine, <button id="addToList">+My list</button>
document.onclick = function(event){
    const imgTagName = event.target.tagName;
    console.log(event.target);
    if(imgTagName === 'IMG'){
        //const id = event.target.id;
        const section = event.target.parentElement;
        const content = section.nextElementSibling;
        content.classList.add('content-display');

    }

    const closeButton = event.target.id;
    if(closeButton === 'content-close'){
        const content = event.target.parentElement;
        content.classList.remove('content-display');
    }

}


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
        input.value='';
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