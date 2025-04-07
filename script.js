const content=document.querySelector('.content');        //for displaying the movie list
const searchBtn=document.getElementById('search-btn');  //for search the movie
const input=document.getElementById('movie');          //input text ares
const loading=document.getElementById('load-box');    //no movie found
const favBtn=document.querySelector('.favButton');   //add to fav card button
const favHeader=document.getElementById('fav-btn'); //header favorite button
const favSection=document.querySelector('.fav-section');
let favMovies=[];

const authToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNGYyMjc0NzhhZjkzOGYxODkwOTc5MTkxNTg4MDE3MyIsIm5iZiI6MTc0MjgzMTMwMC4zMjcwMDAxLCJzdWIiOiI2N2UxN2VjNGI4ZTBmZWE5MzQwODJjYzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-yXMrDKSX5C740uzhFtMHnG0-pRrNfgxfrxUknUnu8M';

async function getMovieDetails(query){
    const response=await fetch(` https://api.tvmaze.com/search/shows?q=${query}`);
    const data=await response.json();
    console.log(data);
    return data;
}

searchBtn.addEventListener('click',async()=>{
    const inputValue=input.value;
    favSection.style.display="none";
    if(inputValue==""){
        alert("please enter the movie name !");
        return;
    }


    const movies=await getMovieDetails(inputValue);
    if(movies.length===0){
        alert("No movie found ! ");
        return;
    }
    loading.style.display="none";
    for(let movie of movies){
        const movieName=movie.show.name;
        const lang=movie.show.language;
        const launch=movie.show.ended;
        const summary=movie.show.summary;
        const img=movie.show.image.medium;
        const category=movie.show.genres;
        const rating=movie.show.rating.average;
        const id=movie.show.id;

        const title = document.createElement('div');
        title.innerHTML = `
        <div class="card">
           <div class="image">
           <img src="${img}"/>
        </div>
        <div class="content-box">
            <div class="upper">
                 <h1>Movie : ${movieName}</h1>
                <p>Language : ${lang}</p>
                <p>Released : ${launch}</p>
            <div class="center-part">
                <p>ID : ${id}</p>
                <p id="rating">Rating: &#11088 ${rating || 'N/A'}/10</p>
                <button class="favButton">Add Favourites</button>
            </div>
         </div>
         <div class="lower">
                 <p>Category : ${category.join(' | ')}</p><br>
                 <p id="about">About : ${summary}</p>
        </div>
       </div>
       </div>
        `;

    const favButton = title.querySelector('.favButton');
    favButton.addEventListener('click', () => {
        const movieData = {
                movieName, lang, launch, summary, img, category, rating, id
        };

       // for checking the existence of fav-movies in favMovies array
        const exists=false;
        for(let m of favMovies){
            if(m.id===id){
                exists=true;
                break;
            }
        }
        if (!exists) {
               favMovies.push(movieData);
               alert(`${movieName} added to favourites!`);
        } 
        else {
               alert(`${movieName} is already in favourites!`);
        }
        });

           content.appendChild(title);

        }
    
        });

    favHeader.addEventListener('click', () => {
        favSection.innerHTML = ""; 
        favSection.style.display = "flex";
        content.style.display = "none";

         if (favMovies.length === 0) {
               favSection.innerHTML = `<p id="fav-loading">No movie favorites yet !<p>`;
               return;
        }

        favMovies.forEach(movie => {
             const favCard = document.createElement('div');
             favCard.innerHTML = `
                     <div class="card">
                     <div class="image">
                      <img src="${movie.img}"/>
                     </div>
                     <div class="content-box">
                      <div class="upper">
                           <h1>Movie : ${movie.movieName}</h1>
                           <p>Language : ${movie.lang}</p>
                           <p>Launched : ${movie.launch}</p>
                        <div class="center-part">
                            <p>ID : ${movie.id}</p>
                            <p id="rating">Rating: &#11088 ${movie.rating || 'N/A'}/10</p>
                            <button class="remButton">Remove</button>
                        </div>
                    </div>
                    <div class="lower">
                           <p>Category : ${movie.category.join(' | ')}</p><br>
                           <p id="about">About : ${movie.summary}</p>
                    </div>
                    </div>
                    </div>
            `;
            favSection.appendChild(favCard);
            });
          });
