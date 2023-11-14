/* eslint-disable no-inner-declarations */
/* eslint-disable no-use-before-define */
import UrlParser from '../../routes/url-parser';
import RestaurantApiSource from '../../data/restaurantapi-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import FavoriteRestoIdb from '../../data/favorite-resto-idb';
import CONFIG from '../../globals/config';

const Detail = {
  async render() {
    return `
    <div id="restaurant" class="restaurant"></div>
    <div id="likeButtonContainer"></div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantContainer = document.querySelector('#restaurant');

    const loadingIndicator = document.createElement('div');
    loadingIndicator.classList.add('custom-loader');
    restaurantContainer.appendChild(loadingIndicator);

    try {
      const restaurant = await RestaurantApiSource.detailRestaurant(url.id);

      restaurantContainer.removeChild(loadingIndicator);

      restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        favoriteRestaurants: FavoriteRestoIdb,
        restaurant: {
          ...restaurant,
          poster: `https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}`,
        },
      });

      const reviewForm = document.querySelector('#reviewForm');

      reviewForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nameInput = document.querySelector('#reviewName');
        const reviewInput = document.querySelector('#reviewText');

        const newReview = {
          id: url.id,
          name: nameInput.value,
          review: reviewInput.value,
        };

        try {
          const response = await fetch(`${CONFIG.BASE_URL}/review`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReview),
          });

          if (!response.ok) {
            throw new Error(`Failed to add review: ${response.statusText}`);
          }

          const responseData = await response.json();

          updateReviews(responseData.customerReviews);

          nameInput.value = '';
          reviewInput.value = '';
        } catch (error) {
          console.error(error.message);
        }
      });

      function updateReviews(reviews) {
        const reviewsContainer = document.querySelector('.restaurant__reviews ul');

        reviewsContainer.innerHTML = '';

        reviews.forEach((review) => {
          const reviewItem = document.createElement('li');
          reviewItem.innerHTML = `<strong>${review.name}:</strong> ${review.review}`;
          reviewsContainer.appendChild(reviewItem);
        });
      }
    } catch (error) {
      restaurantContainer.removeChild(loadingIndicator);

      restaurantContainer.innerHTML = 'Failed to load restaurant details. Please try again later.';
      console.error(error.message);
    }
  },
};

export default Detail;
