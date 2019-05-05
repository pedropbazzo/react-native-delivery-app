import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import TripDocument from './TripDocument';

export default class TripDocuments extends React.Component {
  buildDocuments() {
    let documents = [];

    this.props.trip.documents.map(function(doc) {
      documents.push(<TripDocument key={doc.id} document={doc}/>);
    }.bind(this));

    return documents;
  }

  render() {
    return (
      <View style={styles.container}>
        {(() => {
          if (this.props.trip.documents.length > 0)
            return this.buildDocuments()
          else
            return (<Text style={styles.noDocumentsText}>No documents</Text>)
        })()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  noDocumentsText: {
    padding: 15,
    textAlign: 'center'
  }
});