export default class OutdoorsRec {
  static async getOutdoors() {
    try {
      const response = await fetch(
        // `https://ridb.recreation.gov/api/v1/recareas?&apikey=${process.env.API_KEY}&limit=30`);
        `https://ridb.recreation.gov/api/v1/recareas?&apikey=${process.env.API_KEY}`);
      if (!response.ok) {
        throw Error(response.status);
      }
      return response.json();
    } catch (error) {
      return error.message;
    }
  }

  static async getOutdoorsURL(recID) {
    try {
      const response = await fetch(
        // `https://ridb.recreation.gov/api/v1/recareas?&apikey=${process.env.API_KEY}&limit=30`);
        `https://ridb.recreation.gov/api/v1/recareas/${recID}/links?&apikey=${process.env.API_KEY}`);
      if (!response.ok) {
        throw Error(response.status);
      }
      return response.json();
    } catch (error) {
      return error.message;
    }
  }

  static async getIds(city) {
    try {
      const response = await fetch(
        `https://ridb.recreation.gov/api/v1/recareaaddresses?&apikey=${process.env.API_KEY}&query=${city}&offset=0`);
      if (!response.ok) {
        throw Error(response.status);
      }
      return response.json();
    } catch (error) {
      return error.message;
    }
  }
}