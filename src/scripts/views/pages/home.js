import RestaurantApiSource from '../../data/restaurantapi-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
    <!-- Hero -->
    <div class="hero">
    <picture >
      <source media="(max-width: 600px)" srcset="images/hero-image_2-small.png">
      <img src='images/hero-image_2-large.png' alt="Hero Image">
    </picture>
    <div class="hero-content">
      <h1>Delight Your Taste Buds</h1>
      <p>At our table, every meal is a story, and every flavor is a chapter waiting to be savored.</p>
    </div>
  </div>
  
    <!-- Restaurants -->
    <section class="shop" id="shop">
      <div class="middle-text">
        <h2>Restaurants Review</h2>
        <p>In a world of endless flavors, each restaurant is a unique chapter</p>
      </div>
  
      <div class="restaurant-content" id="restaurant-container">
        <!-- Loading indicator will be added here -->
      </div>
    </section>
  
    <!-- Web About -->
    <section class="about" id="about">
    <div class="about-img">
      <picture>
        <source media="(max-width: 600px)" srcset="images/food.png">
        <img src='images/food-large.png' alt="Food Image">
      </picture>
    </div>
      <div class="about-text">
        <h2>Welcome to Food Destination, <br>where culinary excellence meets warm hospitality.<br></h2>
        <p>Our journey began with a passion for creating memorable dining experiences, and today, we take pride in offering you a diverse range of delightful cuisines crafted by skilled chefs from around the world.</p>
        <div class="about-btnn">
          <a href="https://www.linkedin.com/in/salsamputeri" class="about-btnn">About Us</a>
        </div>
      </div>
    </section>
      `;
  },

  async afterRender() {
    const restaurantContainer = document.querySelector('#restaurant-container');

    const loadingIndicator = document.createElement('div');
    loadingIndicator.classList.add('custom-loader');
    restaurantContainer.appendChild(loadingIndicator);

    try {
      const restaurants = await RestaurantApiSource.listRestaurants();

      restaurantContainer.removeChild(loadingIndicator);

      restaurantContainer.innerHTML = '';

      restaurants.forEach((restaurant) => {
        restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    } catch (error) {
      restaurantContainer.removeChild(loadingIndicator);

      restaurantContainer.innerHTML = 'Failed to load restaurant list. Please try again later.';
      console.error(error.message);
    }
  },
};

export default Home;
