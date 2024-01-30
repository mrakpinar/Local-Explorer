import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

const MapComponent = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getPermission = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          alert("Please Grant Location Permission!");
          return;
        }
    
        let currentLocation = await Location.getCurrentPositionAsync({});
        console.log("Location:", currentLocation.coords);
    
        setLocation(currentLocation);
      } catch (error) {
        console.error("Error getting location:", error);
      }
    };
    getPermission();
  }, []);

  return (
    <MapView
    provider={PROVIDER_GOOGLE}
    style={styles.map}
    region={{
      latitude: location?.latitude || 37.7749,
      longitude: location?.longitude || -122.4194,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  >
    {location && <Marker coordinate={location.coords} />}
  </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MapComponent;
