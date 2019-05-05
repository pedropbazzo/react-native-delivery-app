import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Variables from '../styles/Variables';
import TripDocuments from './TripDocuments';
import TripCommunication from './TripCommunication';
import CallToAction from './CallToAction';

export default class TripDocumentsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCallToAction: true
    }

    this.previousScrollY = null
    this.onScroll = this.onScroll.bind(this)
    this.toggleAddDocument = this.toggleAddDocument.bind(this);
  }

  onScroll(event) {
    const scrollY = event.nativeEvent.contentOffset.y;
    
    if (!this.previousScrollY || this.previousScrollY < scrollY - 50 || this.previousScrollY > scrollY + 50) {
      const show = (!this.previousScrollY || this.previousScrollY > scrollY)
      if (this.state.showCallToAction != show) {
        this.setState({showCallToAction: show})
      }
      this.previousScrollY = scrollY
    }
  }

  toggleAddDocument() {

  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <KeyboardAwareScrollView onScroll={this.onScroll}>
          <TripDocuments trip={this.props.trip}/>
          <View style={styles.container}>
            <View>
              <Text style={styles.moreDetailsLabel}>
                View details for more information
              </Text>
            </View>

            <View style={styles.divider}/>

            <TripCommunication trip={this.props.trip}/>
          </View>
        </KeyboardAwareScrollView>

        {(() => {
          if (this.state.showCallToAction)
            return (<CallToAction text={"Add Documents"} onClick={this.toggleAddDocument}/>)
        })()}
      </View>
    )
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  container: {
    paddingHorizontal: 30,
    alignItems: 'stretch',
    justifyContent: 'center',
    marginBottom: 30
  },
  divider: {
    borderBottomColor: Variables.colorGray,
    borderBottomWidth: 1,
    marginVertical: 15
  },
  moreDetailsLabel: {
    fontSize: 12,
    lineHeight: 12,
    marginTop: 15,
    textAlign: 'center',
    color: Variables.colorGray
  }
});