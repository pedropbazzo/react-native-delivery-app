import API from './API'

const TripAPI = {
  getAll: function(filters) {
    return API.get(
      `/api/v2/drivers/trips`,
      filters
    );
  },

  getOne: function(id) {
    return API.get(`/api/v2/drivers/trips/` + id);
  }
};

export default TripAPI;