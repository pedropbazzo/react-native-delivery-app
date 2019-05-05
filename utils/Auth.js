import {
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import SessionAPI from '../api/SessionAPI';

class Auth {
  constructor() {
    this._setTokenAsync();
  }

  async _setTokenAsync() {
    let keys = ['driver-profile', 'driver-uid', 'driver-client', 'driver-access-token'];

    await AsyncStorage.multiGet(keys, (err, stores) => {
      try {
        this.profile = JSON.parse(stores[0][1])
      } catch(e) {
        this.profile = null
      }

      this.uid = stores[1][1]
      this.client = stores[2][1]
      this.access_token = stores[3][1]
    });
  }

  isAuthenticated() {
    return (this.access_token ? true : false)
  }

  logIn(username, password) {
    return SessionAPI.logIn(username, password).then(res => {
      this.saveSession(res)
    })
  }

  logOut() {
    return SessionAPI.logOut().then(res => {
      this.clearSession()
    })
  }

  saveSession(response) {
    let headers = response.headers
    let data = response.data

    AsyncStorage.setItem('driver-profile', JSON.stringify(data['profile']))
    AsyncStorage.setItem('driver-uid', headers['uid'])
    AsyncStorage.setItem('driver-client', headers['client'])
    AsyncStorage.setItem('driver-access-token', headers['access-token'])

    this.profile = data['profile']
    this.uid = headers['uid']
    this.client = headers['client']
    this.access_token = headers['access-token']

    return true
  }

  clearSession() {
    AsyncStorage.removeItem('driver-profile')
    AsyncStorage.removeItem('driver-uid')
    AsyncStorage.removeItem('driver-client')
    AsyncStorage.removeItem('driver-access-token')

    this.profile = null
    this.uid = null
    this.client = null
    this.access_token = null

    return true
  }
}

const auth = new Auth()

export default auth