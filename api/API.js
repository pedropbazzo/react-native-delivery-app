import React from 'react';
import axios from 'axios';
import Auth from '../utils/Auth'

const client = axios.create({
  baseURL: 'https://staging.loadpanel.com'
});

const API = {
  get: function(path, params) {
    var uri = this.buildUri(path, params);

    return client.get(
      uri, {
        headers: this.getHeaders()
      })
      .then(this.checkStatus)
      .catch(e => {
        if (e.response.status == 401) {
          //show log in
        }
      });
  },

  post: function(path, params) {
    var uri = this.buildUri(path, params);

    return client.post(
      uri, {
        headers: this.getHeaders()
      })
      .then(this.checkStatus)
  },

  delete: function(path, params) {
    var uri = this.buildUri(path, params);

    return client.delete(
      uri, {
        headers: this.getHeaders()
      })
      .then(this.checkStatus)
  },

  getHeaders: function() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'uid': Auth.uid,
      'client': Auth.client,
      'access-token': Auth.access_token
    }
  },

  checkStatus: function(response) {
    if (response.status == 200 || response.status == 201) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  },

  buildUri: function(path, params) {
    var uri = path;
    var query = this.buildQuery(params);

    if (query) {
      uri += '?' + query;
    }

    return uri;
  },

  buildQuery: function(params) {
    if (!params) {
      return null;
    }

    var esc = encodeURIComponent;
    return Object.keys(params)
      .map(k => (
        Array.isArray(params[k]) ? (
          params[k].map(i => (k + '=' + i))
        ) : (k + '=' + esc(params[k]))
      ))
      .flat()
      .join('&');
  }
};

export default API; 