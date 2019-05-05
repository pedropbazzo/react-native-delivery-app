import React from 'react';
import {
  ActivityIndicator,
  Animated,
  AsyncStorage,
  Button,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Dimensions
} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Variables from '../styles/Variables';
import TripAPI from '../api/TripAPI';
import TripNavigation from '../components/TripNavigation';
import TripDetailsTab from '../components/TripDetailsTab';
import TripDocumentsTab from '../components/TripDocumentsTab';

export default class TripScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    const trip = params.trip || {};

    return {
      headerTitle: <TripNavigation trip={trip}/>,
      headerLeft: null
    };
  };

  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      routes: [
        { key: 'details', title: 'Load Details' },
        { key: 'documents', title: 'Documents' }
      ],
      trip: {
        user: {},
        trucks: [],
        trailers: [],
        drivers: [],
        stops: [],
        documents: []
      }
    }

    this.renderTabBar = this.renderTabBar.bind(this);
    this.renderLabel = this.renderLabel.bind(this);
  }

  renderTabBar(props) {
    return (
      <TabBar {...props}
        style={styles.tabContainer}
        tabStyle={{padding: 12}}
        labelStyle={styles.tabLabel}
        indicatorStyle={styles.tabIndicator}
        renderLabel={this.renderLabel(props)} />
    );
  }

  renderLabel(props) {
    let index = 0;
    return ({ route }) => {
      const focused = index === props.navigationState.index;
      index += 1;
      return (
        <View>
          <Text
            style={[
              styles.labelStyle,
              focused ? styles.tabLabelSelected : null,
            ]}
          >
            {route.title}
          </Text>
        </View>
      );
    };
  }

  componentDidMount() {
    TripAPI.getOne(this.props.navigation.getParam('id')).then(res => {
      this.props.navigation.setParams({
        trip: res.data.trip
      });

      this.setState({
        trip: res.data.trip
      })
    })
  }

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          details: () => (<TripDetailsTab trip={this.state.trip}/>),
          documents: () => (<TripDocumentsTab trip={this.state.trip}/>)
        })}
        onIndexChange={index => this.setState({ index })}
        renderTabBar={this.renderTabBar}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    marginTop: 80,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  tabContainer: {
    backgroundColor: Variables.colorLightGray
  },
  tabLabel: {
    color: Variables.colorDarkGray,
    fontSize: 14,
    textTransform: 'none'
  },
  tabLabelSelected: {
    color: Variables.colorBlue
  },
  tabIndicator: {
    backgroundColor: Variables.colorBlue,
    height: 3
  }
});