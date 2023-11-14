import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantApiSource {
  static async listRestaurants() {
    try {
      const response = await fetch(API_ENDPOINT.LIST);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const responseJson = await response.json();
      return responseJson.restaurants;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  }

  static async detailRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const responseJson = await response.json();
      return responseJson.restaurant;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  }
}

export default RestaurantApiSource;
