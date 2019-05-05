import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import moment from 'moment';
import Variables from '../styles/Variables';

export default function MessengerMessage(props) {
  return (
    <View style={[styles.container]}>
      <View style={props.owned ? styles.ownedContent : styles.unownedContent}>
        <View style={[styles.photoContainer, props.owned ? styles.ownedPhotoContainer : styles.unownedPhotoContainer]}>
          {(() => {
            if (!props.message.read)
              return (
                <View style={styles.unreadMarkerContainer}>
                  <View style={styles.unreadMarker}/>
                </View>
              )
          })()}
          <Image
            style={styles.photo}
            source={{uri: props.message.profile.photo}}
          />
        </View>
        <Text style={[props.owned ? styles.ownedBody : styles.unownedBody]}>
          {props.message.body}
        </Text>
      </View>
      <Text style={[styles.metadata, props.owned ? styles.ownedMetadata : styles.unownedMetadata]}>
        {props.message.profile.owner.name}, {moment(props.message.sent_on).format('MMM. D, HH:mm')}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    transform: [{ scaleY: -1 }]
  },
  ownedContent: {
    flexDirection: 'row-reverse'
  },
  unownedContent: {
    flexDirection: 'row'
  },
  ownedBody: {
    color: Variables.colorBlue
  },
  photoContainer: {
    overflow: 'visible'
  },
  unownedPhotoContainer: {
    marginRight: 15
  },
  ownedPhotoContainer: {
    marginLeft: 15
  },
  unreadMarkerContainer: {
    position: 'absolute',
    top: -6,
    left: -6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Variables.colorWhite,
    zIndex: 5
  },
  unreadMarker: {
    position: 'absolute',
    top: 3,
    left: 3,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Variables.colorRed
  },
  photo: {
    width: 40,
    height: 40,
    borderRadius: 4
  },
  metadata: {
    fontSize: 12,
    lineHeight: 22,
    color: Variables.colorGray
  },
  ownedMetadata: {
    textAlign: 'right'
  }
});