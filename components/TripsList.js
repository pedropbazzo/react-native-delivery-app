import React from 'react'
import {
  View
} from 'react-native';
import TripRow from './TripRow';
import TripAPI from '../api/TripAPI';

export default class TripsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      isLoading: true,
      trips: []
    };
  }

  componentDidMount() {
    this.setState({isMounted: true})
    TripAPI.getAll({'load_status_name[]': this.props.statuses}).then(res => {
      if (this.state.isMounted)
        this.setState({
          isLoading: false,
          trips: res.data.trips
        })
    })
  }

  componentWillUnmount() {
    this.setState({isMounted: false})
  }

  render() {
    return (
      <View>
        {(() => {
          return this.buildList()
        })()}
      </View>
    )
  }

  buildList() {
    let rows = []

    this.state.trips.map(function(trip) {
      rows.push(<TripRow key={trip.id} trip={trip}/>)
    });

    return rows;
  }
}