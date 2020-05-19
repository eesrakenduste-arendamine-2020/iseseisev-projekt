const searchForm = document.querySelector("#search-form");
const movie = document.querySelector("#movies");
const urlPoster = "https://image.tmdb.org/t/p/w500";

function apiSearch(event) {
  event.preventDefault();
  const searchText = document.querySelector(".form-control").value;
  if (searchText.trim().length === 0) {
    movie.innerHTML =
      '<h2 class="col-12 text-center text-danger">Otsinguväli ei tohi olla tühi.</h2>';
    return;
  }
  movie.innerHTML = '<div class="space"></div>';

  fetch(
    "https://api.themoviedb.org/3/search/multi?api_key=4fd0552dee26b67e5b433d25966f34ac&language=en&query=" +
      searchText
  )
    .then(function (value) {
      if (value.status !== 200) {
        return Promise.reject(new Error(value.status));
      }
      return value.json();
    })
    .then(function (output) {
      let inner = "";
      if (output.results.length === 0) {
        inner =
          '<h2 class="col-12 text-center text-info">Teie päringule ei leitud tulemusi.</h2>';
      }
      output.results.forEach(function (item) {
        let nameItem = item.name || item.title;
        const poster = item.poster_path
          ? urlPoster + item.poster_path
          : "./img/noposter.jpg";
        let dataInfo = "";
        if (item.media_type !== "person")
          dataInfo = `data-id="${item.id}" data-type="${item.media_type}"`;
        inner += `
                    <div class="row mb-3">
                    <div class="col-4 themed-grid-col">
                    <div class="card" style="width: 17rem;">
                    <img class="card-img-top" src="${poster}" alt="${nameItem}" ${dataInfo}>
                    <div class="card-body">
                    <h6><span class="badge badge-secondary"> OTSING </span> ${nameItem} </h6>
                    </div>
                    </div>
                    </div>
                    </div>
                    `;
      });
      movie.innerHTML = inner;
      addEventMedia();
    })
    .catch(function (reason) {
      movie.innerHTML = "Oops! Midagi läks valesti!";
      console.error(reason || reason.status);
    });
}

searchForm.addEventListener("submit", apiSearch);

function addEventMedia() {
  const media = movie.querySelectorAll("img[data-id]");
  media.forEach(function (elem) {
    elem.style.cursor = "pointer";
    elem.addEventListener("click", showFullInfo);
  });
}

function showFullInfo() {
  let url = "";
  if (this.dataset.type === "movie") {
    url =
      "https://api.themoviedb.org/3/movie/" +
      this.dataset.id +
      "?api_key=4fd0552dee26b67e5b433d25966f34ac&language=en";
  } else if (this.dataset.type === "tv") {
    url =
      "https://api.themoviedb.org/3/tv/" +
      this.dataset.id +
      "?api_key=4fd0552dee26b67e5b433d25966f34ac&language=et";
  } else {
    movie.innerHTML =
      '<h2 class="col-12 text-center text-danger">Viga. Palun proovige hiljem uuesti.</h2>';
  }

  fetch(url)
    .then(function (value) {
      if (value.status !== 200) {
        return Promise.reject(new Error(value.status));
      }
      return value.json();
    })
    .then((output) => {
      movie.innerHTML = `
      <h1>${output.name || output.title}</h1>
      <div class="row">
      <div class="col-md-4">
      <img src='${urlPoster + output.poster_path}' alt='${
        output.name || output.title
      }'>
      <a href="${
        output.homepage
      }" class="btn btn-info btn-lg btn-block" role="button"> Ametlik leht </a>
      <a href="https://imdb.com/title/${
        output.imdb_id
      }" class="btn btn-success btn-lg btn-block" role="button"> IMDB.com leht </a>
      </div>
        <div class="col-sm-8">
          <h3>Kirjeldus</h3>
          <p>${output.overview}</p>
          <h3>Rohkem detaile</h3>
          <ul>
            <li>Hinnang: <b>${output.vote_average}</b></li>
            <li>Olek: <b>${output.status}</b></li>
            <li>Esietendus: <b>${
              output.first_air_date || output.release_date
            }</b></li>
          </ul>
          <div class="youtube"></div>
        </div>`;

      getVideo(this.dataset.type, this.dataset.id);
    })
    .catch(function (reason) {
      movie.innerHTML = "Oops! Midagi läks valesti!";
      console.log(reason || reason.status);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  fetch(
    "https://api.themoviedb.org/3/trending/all/week?api_key=4fd0552dee26b67e5b433d25966f34ac&language=en"
  )
    .then(function (value) {
      if (value.status !== 200) {
        return Promise.reject(new Error(value.status));
      }
      return value.json();
    })
    .then(function (output) {
      let inner = `
            <main role="main" class="container">
            <div class="starter-page">
                <h1>Nädala populaarsed filmid</h1>
                <p class="lead">Tänu meie hinnangule saate vaadata ja valida ainult meie aja parimaid filme. Peate tunnistama, et see on palju mugavam kui aja jooksul kõigi avaldatud piltide vaatamine ja kõige huvitavamate valimine. Meie saiti on palju lihtsam kasutada ja filmide hinnang annab teile hõlpsasti teada, mida publik valib.</p>
            </div>
            </main>`;
      if (output.results.length === 0) {
        inner =
          '<h2 class="col-12 text-center text-info">Teie päringule ei leitud tulemusi.</h2>';
      }
      output.results.forEach(function (item) {
        let nameItem = item.name || item.title;
        let mediaType = item.title ? "movie" : "tv";
        const poster = item.poster_path
          ? urlPoster + item.poster_path
          : "./img/noposter.jpg";
        let dataInfo = `data-id="${item.id}" data-type="${mediaType}"`;
        inner += `
                    <div class="row mb-3">
                    <div class="col-4 themed-grid-col">
                    <div class="card" style="width: 17rem;">
                    <img class="card-img-top" src="${poster}" alt="${nameItem}" ${dataInfo}>
                    <div class="card-body">
                    <h6><span class="badge badge-danger"> UUS! </span> ${nameItem} </h6>
                    </div>
                    </div>
                    </div>
                    </div>
                    `;
      });
      movie.innerHTML = inner;
      addEventMedia();
    })
    .catch(function (reason) {
      movie.innerHTML = "Oops! Midagi läks valesti!";
      console.error(reason || reason.status);
    });
});

function getVideo(type, id) {
  let youtube = movie.querySelector(".youtube");

  fetch(
    `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=4fd0552dee26b67e5b433d25966f34ac&language=en`
  )
    .then((value) => {
      if (value.status !== 200) {
        return Promise.reject(new Error(value.status));
      }
      return value.json();
    })
    .then((output) => {
      console.log(output);

      let videoFrame = "<h3>Treilerid</h3>";

      console.log(output.results.length);
      if (output.results.length === 0) {
        videoFrame = "<p>Videot pole</p>";
      }

      output.results.forEach((item) => {
        videoFrame +=
          '<iframe width="260" height="115" src="https://www.youtube.com/embed/' +
          item.key +
          '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      });

      youtube.innerHTML = videoFrame;
    })
    .catch((reason) => {
      youtube.innerHTML = "Kahjuks pole videot :(";
      console.error(reason || reason.status);
    });
}
