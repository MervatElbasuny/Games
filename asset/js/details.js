// details.js

export class GameCard {
    constructor(game) {
        this.game = game;
        this.isFreeToPlay = !!game.freetogame_profile_url;
        this.createCard();
    }

    createCard() {
        const maxLength = 50;
        const shortDescriptionWithCommas =
          this.game.short_description.split(' ').join(', ').substring(0, maxLength) + '...';
    
        const template = `
          <div class="col-md-3 mb-4 card-container">
            <div class="card bg-transparent">
              <img src="${this.game.thumbnail || 'placeholder-image.jpg'}" class="card-img-top px-3 mt-3" alt="${this.game.title}">
              <div class="card-body d-flex justify-content-between">
                <h5 class="h6 small">${this.game.title}</h5>
                <span class="badge text-bg-primary p-2">${this.isFreeToPlay ? 'Free' : 'Paid'}</span>
              </div>
              <p class="card-text small text-center opacity-50 mb-3 px-3">${shortDescriptionWithCommas}</p>
              <div class="card-footer d-flex justify-content-between small">
                <span class="badge badge-color pt-2">${this.game.genre}</span>
                <span class="badge badge-color pt-2">${this.game.platform}</span>
              </div>
            </div>
          </div>
        `;
   
        
        const gameCard = $(template);
    
        // Add click event to show details
        gameCard.click(() => this.showDetails());
    
      gameCard.hover(
          function () {
            $(this).css({
              'transform': 'scale(1.1)',
              'transition': 'transform 0.7s ease-in-out'
            });
          },
          function () {
            $(this).css({
              'transform': 'scale(1)',
              'transition': 'transform 0.7s ease-in-out',
            });
          });
    
        $('#games-container .row').append(gameCard)
      }

      async showDetails() {
        const gameId = this.game.id;
        showLoader();
        const gameDetails = await getGameDetails(gameId);
    
        // Populate details section
        const detailsContent = $('#detailsContent');
        detailsContent.html(`
          <div class="col-md-4">
            <img src="${gameDetails.thumbnail}" class="w-100" alt="image details">
          </div>
          <div class="col-md-8">
            <h3>Title: ${gameDetails.title}</h3>
            <p>Category: <span class="badge text-bg-info">${gameDetails.genre}</span></p>
            <p>Platform: <span class="badge text-bg-info">${gameDetails.platform}</span></p>
             <p>status:  <span class="badge text-bg-info">${gameDetails.status}</span></p>
            <p>${gameDetails.description}</p>
            <a class="btn btn-outline-warning" target="_blank" href="${gameDetails.game_url}">Show Game</a>
          </div>
        `);
    
        // Toggle visibility of the games and details sections
        $('#games').hide();
    
        $('.details').show();
        
        hideLoader();
      }
}

async function getGameDetails(gameId) {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`;
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
