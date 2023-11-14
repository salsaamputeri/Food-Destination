/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const assert = require('assert');

Feature('Restaurant Review');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('add customer review', async ({ I }) => {
  I.seeElement('.s-btnn a');
  const firstRestaurant = locate('.s-btnn a').first();
  const firstRestaurantText = await I.grabTextFrom(firstRestaurant);

  const firstRestaurantName = firstRestaurantText.trim().replace(/^About\s+/i, '');

  I.click(firstRestaurant);

  I.seeElement('#reviewForm');
  I.fillField('#reviewName', 'test');
  I.fillField('#reviewText', 'Great restaurant!');

  I.click('Submit Review');

  I.see('test:', '.restaurant__reviews ul');
});
