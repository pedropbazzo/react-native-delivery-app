import API from './API'

const SessionAPI = {
  logIn: function(username, password) {
    return API.post(
      `/api/v2/sessions`, {
        'section': 'Driver',
        'profile[username]': username,
        'profile[password]': password
      }
    );
  },

  logOut: function() {
    return API.delete(`/api/v2/sessions`);
  }
};

export default SessionAPI;