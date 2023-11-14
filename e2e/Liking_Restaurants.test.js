/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
  I.amOnPage('/');

  I.seeElement('.s-btnn a');
  const firstRestaurant = locate('.s-btnn a').first();
  const firstRestaurantText = await I.grabTextFrom(firstRestaurant);

  const firstRestaurantName = firstRestaurantText.trim().replace(/^About\s+/i, '');

  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.row');

  const likedRestaurantTitle = await I.grabTextFrom('.row .s-btnn a');

  const likedRestaurantName = likedRestaurantTitle.trim().replace(/^About\s+/i, '');

  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
  I.amOnPage('/');

  I.seeElement('.s-btnn a');
  const firstRestaurant = locate('.s-btnn a').first();
  const firstRestaurantText = await I.grabTextFrom(firstRestaurant);

  const firstRestaurantName = firstRestaurantText.trim().replace(/^About\s+/i, '');

  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.row');

  const likedRestaurantTitle = await I.grabTextFrom('.row .s-btnn a');

  const likedRestaurantName = likedRestaurantTitle.trim().replace(/^About\s+/i, '');

  assert.strictEqual(firstRestaurantName, likedRestaurantName);

  I.click('.row .s-btnn a');

  I.amOnPage('/#/favorite');
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
});

Scenario('searching restaurants', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
  I.amOnPage('/');

  I.seeElement('.s-btnn a');

  const titles = [];
  for (let i = 1; i <= 3; i++) {
    const currentElement = locate('.s-btnn a').at(i);

    I.click(currentElement);

    I.seeElement('#likeButton');
    I.click('#likeButton');

    // eslint-disable-next-line no-await-in-loop
    const currentTitle = await I.grabTextFrom(currentElement);

    const currentRestaurantName = currentTitle.trim().replace(/^About\s+/i, '');

    titles.push(currentRestaurantName);
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.row');
  assert.strictEqual(titles.length, visibleLikedRestaurants);
});
