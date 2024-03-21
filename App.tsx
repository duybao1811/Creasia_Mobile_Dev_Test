import React from 'react';
import MapView, {enableLatestRenderer, Marker} from 'react-native-maps';
import useCoordinatesData from './useCoordinatesData';
import useRequestLocationPermission from './useRequestLocationPermission';

enableLatestRenderer();

function replaceCommasWithDot(numberString: string) {
  // Using regular expression to replace commas with dots
  return numberString.replace(/,/g, '.');
}

const App = () => {
  const coordinatesData = useCoordinatesData();
  useRequestLocationPermission();

  if (!coordinatesData?.length) {
    return null;
  }

  return (
    <MapView
      initialRegion={{
        latitude: 11.0223999,
        longitude: 106.7021027,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      provider={'google'}
      showsUserLocation
      showsMyLocationButton
      style={{flex: 1}}>
      {coordinatesData?.map((coordinate, index) => {
        const latitude = Number(
          replaceCommasWithDot(coordinate.latitude.toString()),
        );
        const longitude = Number(
          replaceCommasWithDot(coordinate.longitude.toString()),
        );
        return (
          <Marker
            key={`${coordinate?.shopCode}-${index}`}
            coordinate={{
              latitude,
              longitude,
            }}
            title={coordinate.shopName}
            description={`Mã CH: ${coordinate.shopCode} Địa chỉ: ${coordinate.numOfHouse} ${coordinate.street}`}
          />
        );
      })}
    </MapView>
  );
};

export default App;
