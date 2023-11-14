/* eslint-disable no-unused-vars */
import CONFIG from '../../globals/config';

const generateStarIcons = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;

  const starIcons = Array(fullStars).fill('<i class="bx bxs-star"></i>');

  if (halfStar) {
    starIcons.push('<i class="bx bxs-star-half"></i>');
  }

  return starIcons.join('');
};

const createRestaurantDetailTemplate = (restaurant) => `
  <div class="hero-image">
    <img class="restaurant-poster" src="https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}" alt="${restaurant.name}" loading="lazy"/>
    <h2 class="restaurant-name">${restaurant.name}</h2>
    <div class="detailpage-ratings">
      <span>${restaurant.rating}</span>
      ${generateStarIcons(restaurant.rating)}
    </div>
    <div class="restaurant__info">
      <h3>Restaurant Information</h3>
      <h4>Location</h4>
      <p>${restaurant.city}</p>
      <p>${restaurant.address}</p>
      <p> ${restaurant.categories.map((category) => category.name).join(', ')} Food</p>
    </div>
    <div class="restaurant__description">
      <h3>Restaurant Description</h3>
      <p>${restaurant.description}</p>
    </div>
    <div class="restaurant__foodmenu">
    <h3>Food Menu</h3>
    <ul>
      ${restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('')}
    </ul>
    </div>
    <div class="restaurant__drinkmenu">
      <h3>Drink Menu</h3>
      <ul>
        ${restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
      </ul>
    </div>
    <div class="restaurant__reviews">
      <h3>Costumers Review</h3>
      <form id="reviewForm">
      <label for="reviewName">Your Name:</label>
      <input type="text" id="reviewName" required>
      
      <label for="reviewText">Your Review:</label>
      <textarea id="reviewText" required></textarea>
      
      <button type="submit">Submit Review</button>
    </form>
      <ul>
        ${restaurant.customerReviews.map((review) => `<li>${review.name}: ${review.review}</li>`).join('')}
      </ul>
    </div>
  </div>
`;

const createRestaurantItemTemplate = (restaurant) => `
  <div class="row">
    <img src="https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}" alt="${restaurant.name}" loading="lazy">
    <h3>${restaurant.name}</h3>
    <p>${restaurant.city}</p>
    <div class="detail-ratings">
      <span>${restaurant.rating}</span>
      ${generateStarIcons(restaurant.rating)}
    </div>
    <div class="s-btnn">
      <a href="#/detail/${restaurant.id}">About ${restaurant.name}</a>
    </div>
  </div>
`;

const createLikeRestoButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestoButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate, createRestaurantDetailTemplate, createLikeRestoButtonTemplate,
  createUnlikeRestoButtonTemplate,
};
