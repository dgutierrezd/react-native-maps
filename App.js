import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const App = () => {
  const [mapRegion, setMapRegion] = useState(null);
  const [lastLat, setLastLat] = useState(null);
  const [lastLong, setLastLong] = useState(null);

  useEffect(() => {
    const onRegionChange = (region, lat, long) => {
      setMapRegion(region);
      setLastLat(lat || lastLat);
      setLastLong(long || lastLong);
    };
    Geolocation?.getCurrentPosition(
      position => {
        let region = {
          latiude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        onRegionChange(region, region.latitude, region.longitude);
      },
      err => console.log(err),
    );
  });

  return (
    <React.Fragment>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: 5.079178217880358,
          longitude: -75.50051450729372,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
        followsUserLocation>
        <Marker
          coordinate={{
            latitude: 5.079178217880358,
            longitude: -75.50051450729372,
          }}
          title="Mi casa"
          description="Esta es mi casa">
          <View style={styles.marker}>
            <Text style={styles.text}>Mi casa</Text>
          </View>
        </Marker>
      </MapView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  marker: {
    backgroundColor: '#15358c',
    padding: 5,
    borderRadius: 5,
  },
  mapStyle: {
    flex: 1,
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default App;
