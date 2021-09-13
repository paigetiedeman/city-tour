export default class cityTour {
  static async getTour() {
    try {
      const response = await fetch(
        `https://www.triposo.com/api/20210615/day_planner.json?account=${process.env.Account_Key}&token=${process.env.token}&location_id=Seattle&items_per_day=4`
      );
      if (!response.ok) {
        throw Error(response.status);
      }
      return response.json();
    } catch (error) {
      return error.message;
    }
  }
}
