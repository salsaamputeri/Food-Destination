import FavoriteRestoIdb from '../../data/favorite-resto-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
    <!-- Hero -->
    <div class="hero">
    <picture >
      <source media="(max-width: 600px)" srcset="images/hero-image_2-small.png">
      <img src='images/hero-image_2-large.png' alt="Hero Image" >
    </picture>
    <div class="hero-content">
      <h1>Delight Your Taste Buds</h1>
      <p>At our table, every meal is a story, and every flavor is a chapter waiting to be savored.</p>
    </div>
  </div>

    <!-- Restaurants -->
    <div class="content">
    <section class="shop" id="shop">
      <div class="middle-text">
        <h2>Liked Destination</h2>
      </div>

      <div class="restaurant-content" id="restaurant-container">
      </div>
          <h3 class="restaurant-item__not__found">Tidak ada restaurant untuk ditampilkan</h3>
    </section> 
    </div>       
    `;
  },

  async afterRender() {
    const restaurantContainer = document.querySelector('#restaurant-container');
    const notFoundMessage = document.querySelector('.restaurant-item__not__found');

    const loadingIndicator = document.createElement('div');
    loadingIndicator.classList.add('custom-loader');
    restaurantContainer.appendChild(loadingIndicator);

    try {
      const restaurants = await FavoriteRestoIdb.getAllRestaurant();

      restaurantContainer.removeChild(loadingIndicator);

      if (restaurants.length > 0) {
        notFoundMessage.style.display = 'none';
        restaurants.forEach((restaurant) => {
          restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
        });
      } else {
        notFoundMessage.style.display = 'block';
      }
    } catch (error) {
      restaurantContainer.removeChild(loadingIndicator);

      notFoundMessage.style.display = 'block';
      restaurantContainer.innerHTML = 'Failed to load favorite restaurants. Please try again later.';
      console.error(error.message);
    }
  },
};

export default Favorite;
