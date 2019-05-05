import React from 'react'
import {
  ActivityIndicator,
  Text
} from 'react-native';
import NumberFormat from 'react-number-format';
import GeoLocation from '../utils/GeoLocation';

export class DistanceAmount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMounted: false,
      isLoading: true,
      origin: this.props.origin,
      destination: this.props.destination,
      suffix: this.props.suffix || "",
      distance: 0
    }
  }

  componentDidMount() {
    this.setState({isMounted: true})

    if (this.state.origin)
      this.fetchDistance()
    else
      this.fetchCurrentLocation()
  }

  componentWillUnmount() {
    this.setState({isMounted: false})
  }

  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator/>
    } else {
      return (  
        <NumberFormat
          value={this.state.distance}
          displayType={'text'}
          thousandSeparator={true}
          suffix={' miles away'}
          renderText={value => (<Text style={this.props.style}>{value}</Text>)}
        />
      )
    }
  }

  fetchCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let latlng = position.coords.latitude + "," + position.coords.longitude
        this.setState({origin: latlng})
        this.fetchDistance()
      }.bind(this));
    }
  }

  fetchDistance() {
    let origin = this.state.origin
    let destination = this.state.destination
    GeoLocation.getDistance(origin, destination, this.calculateDistance.bind(this));
  }

  calculateDistance(result, status) {
    if (!this.state.isMounted)
      return

    if (status != 'OK') {
      console.log('failed to calculate distance')
    } else {
      let kilometers = result.distance;
      let miles = kilometers * 0.621371;
      this.setState({isLoading: false, distance: Math.round(miles)})
    }
  }
}

export default DistanceAmount