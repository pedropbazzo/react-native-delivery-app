import React from 'react';
import {
  Text,
  StyleSheet,
  View
} from 'react-native';
import Variables from '../styles/Variables';

export default class StopInfo extends React.Component {
  buildNotes() {
    let notes = []

    this.props.stop.notes.map(function(note) {
      notes.push(<Text key={note.id}>{note.notes}</Text>)
    })

    return notes
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.row, {marginTop: 0}]}>
          <View style={styles.column}>
            <Text style={styles.label}>PU/Reference#</Text>
            <Text style={styles.value}>{this.props.stop.number}</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Contact</Text>
            <Text style={styles.value}>{this.props.stop.phone_number}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>BOL#</Text>
            <Text style={styles.value}>{this.props.stop.bol_number}</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Additional Notes</Text>
            <View style={styles.value}>
              {(() => {
                return this.buildNotes()
              })()}
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>PO#</Text>
            <Text style={styles.value}>{this.props.stop.po_number}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  row: {
    marginTop: 20,
    flexDirection: 'row'
  },
  column: {
    flex: 1
  },
  label: {
    fontSize: 12,
    lineHeight: 12,
    color: Variables.colorGray
  }
});