
// jQuery code to handle navigation links and loader
$(document).ready(function () {
  $('.navbar-nav a.nav-link').on('click', function () {
    const category = $(this).text().toLowerCase();
    $('.navbar-nav a.nav-link').removeClass('active');
    $(this).addClass('active');
    clearGameCards();
    getGames(category);
  });

  function clearGameCards() {
    $('#games-container .row').empty();
  }

  //Event listener for loader
  // $('#loader').hide(); // Assuming loader is initially hidden
  // $('#games-container .row').on('DOMNodeInserted', function () {
  //   $('#loader').hide();
  // });
});




// showgames.js
import { GameCard } from './details.js';

export async function getGamesByCategory(tag) {
    const games = await fetchGamesByCategory(tag);
    games.forEach(game => new GameCard(game));
}

async function fetchGamesByCategory(tag) {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=${tag}`;
    return fetchData(url);
}

async function fetchData(url) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e358e875a5msh409a6979b59ab6ap17a450jsn36debe299aab',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
        },
    };

    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}
