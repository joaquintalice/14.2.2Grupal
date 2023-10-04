document.addEventListener('DOMContentLoaded', main);

async function main() {
    const moviesData = await getData();
    searchMovies(moviesData)
}

async function getData() {
    const URL = 'https://japceibal.github.io/japflix_api/movies-data.json';
    const res = await fetch(URL);
    if (!res.ok) throw new Error(`Res error: ${res.status}`);
    const data = await res.json();
    return data;
}

function searchMovies(movies) {
    const searchInput = document.getElementById('inputBuscar');
    const searchBtn = document.getElementById('btnBuscar');



    searchBtn.addEventListener('click', () => {

        if (searchInput.value.length < 1) return;

        const filteredData = movies.filter(movie => {
            const { title, overview, tagline } = movie

            const fTitle = title.toLowerCase().includes(searchInput.value.toLowerCase())
            const fOverview = overview.toLowerCase().includes(searchInput.value.toLowerCase())
            const fTagline = tagline.toLowerCase().includes(searchInput.value.toLowerCase())

            return fTitle || fOverview || fTagline
        })

        showMovies(filteredData.slice(0, 5))
    });

}

function showMovies(filteredData) {
    const lista = document.getElementById('lista');

    const template = filteredData.map((element, indice) => {
        const { title, tagline, vote_average, overview, genres, release_date, runtime, revenue, budget } = element
        const vote_averageInt = Math.round(vote_average / 2);
        // console.log(element)
        const year = release_date.split("-")[0];

        return `
                <article>
                    <div class='card bg-dark cursor-active p-4' href="#collapseExample${indice}" data-bs-toggle="collapse">
                        <div class='row'>
                            <div class= 'col-6'>
                                <h2 class='text-light'>${title}</h2>
                            </div>
                            <div class= 'col-6'>
                                <p class='text-light text-end'>${commentScore(vote_averageInt)}</p>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='col-12'></div>
                                <p class='text-muted'>${tagline}</p>
                            </div>
                        </div>


                    </div> 
                    
                    <div class="collapse" id="collapseExample${indice}">
                        <div class="card card-body bg-dark text-light">
                            <div class='row'>
                                <div class='col-12'>
                                    <strong>${overview}</strong>
                                </div>
                            </div>
                            <hr/>
                            <div class='row'>
                                <div class='col-6'>
                                    ${showGenres(genres)}
                                </div>
                                <div class='col-6 text-end'>
                                    <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    More
                                    </button>
                                    <ul class="dropdown-menu">
                                    <li class="dropdown-item">Year: ${year}</li>
                                    <li class="dropdown-item">Runtime: ${runtime}</li>
                                    <li class="dropdown-item">Budget: $${budget}</li>
                                    <li class="dropdown-item">Revenue: $${revenue}</li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>

                </article>
                `
    })


    lista.innerHTML = template
}

function commentScore(score) {
    let templateStars = ``;

    for (let i = 1; i <= 5; i++) {
        if (i <= score) {
            templateStars += `
                <span class="fa fa-star checked"></span>
                `
        } else {
            templateStars += `
                <span class="fa fa-star"></span>
                `
        }
    }

    return templateStars;
}

function showGenres(genreArray) {
    const genres = genreArray.map(genre => {
        return `
                ${genre.name}
        `
    })
    return genres
}
