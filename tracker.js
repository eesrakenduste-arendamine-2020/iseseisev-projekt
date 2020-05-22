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
let watched = false;
let list = new Array();
list = JSON.parse(window.localStorage.getItem("Movies and tv-shows")) || [];

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
        //console.log(configData);
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

    const section = createSection(elements);

    element.appendChild(section);
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
    localStorage.setItem("search-id", JSON.stringify(this.id));
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

//my listi lisamine
document.onclick = function(event){
    const tagName = event.target.tagName;
    if(tagName === 'IMG'){
        const id = event.target.id;
        const moviePath = `movie/${id}?api_key=`;
        const tvPath = `tv/${id}?api_key=`;
        if($('[data-menu-movies]').hasClass('active')){
            const url = generateUrl(moviePath) + APIKEY;
            fetch(url)
            .then((result) =>{
                return result.json();
            })
            .then((data) =>{
                getTitle(data); 
            })
        }else if($('[data-menu-tv-shows]').hasClass('active')){
            const url = generateUrl(tvPath) + APIKEY;
            fetch(url)
            .then((result) =>{
                return result.json();
            })
            .then((data) =>{
                getTitle(data);
            })
        }else if($('[data-menu-search]').hasClass('active')){
            var searchId = localStorage.getItem("search-id");
            if(searchId=='"movie-search"'){
                const url = generateUrl(moviePath) + APIKEY;
                fetch(url)
                .then((result) =>{
                    return result.json();
                })
                .then((data) =>{
                    //saveLocal();
                    getTitle(data);
                })
            }else if(searchId=='"tv-show-search"'){
                const url = generateUrl(tvPath) + APIKEY;
                fetch(url)
                .then((result) =>{
                    return result.json();
                })
                .then((data) =>{
                    //saveLocal();
                    getTitle(data);
                })
            }
        }
    }
    //my listi elemendi kustutamine
    if(tagName === 'BUTTON'){
        if($('[data-menu-my-list]').hasClass('active')){
            let id = parseInt(event.target.className);
            list = JSON.parse(window.localStorage.getItem("Movies and tv-shows")) || [];
            list.splice(id, 1);
            //addMyListToPage(list);
            saveLocal(list);
            addMyListToPage(list);
        }
    }

}

function getTitle(data){
    if(data.status == "Released"){
        let movie = data.title;
        list.push(movie);
        alert("Movie added to my list");
        saveLocal();
        addMyListToPage();
    }else{
        let show = data.name;
        list.push(show);
        alert("TV-show added to my list");
        saveLocal();
        addMyListToPage();
    }
}

//kuva my list
function addMyListToPage(list){
    let myList = document.getElementById('my-list');
    myList.innerHTML = "";
    list = JSON.parse(window.localStorage.getItem("Movies and tv-shows")) || [];
    if(list.length != 0){
        let ul = document.createElement('ul');
        ul.id = "list-items";
        
        myList.appendChild(ul);
        for(let i = 0; i<list.length; i++){            
            let li = document.createElement('li');
            li.id = "list-item";
            
            ul.appendChild(li);
            let delButton = document.createElement('button');
            delButton.id = "delete-button";         
            delButton.innerHTML = 'X';
            delButton.className = i;
            li.innerHTML = list[i];
            li.appendChild(delButton);            
        }
    } 
}

addMyListToPage();

function saveLocal(){
    localStorage.setItem("Movies and tv-shows", JSON.stringify(list));
}

//klasside muutus, navbar
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
