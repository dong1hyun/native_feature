import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../UI/IconButton";

function Map({ navigation }) {
    const [selectedLocation, setSelectedLocation] = useState();
    const region = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    };
    function selectLocationHandler(event) {
        const latitude = event.nativeEvent.coordinate.latitude;
        const longitude = event.nativeEvent.coordinate.longitude;
        setSelectedLocation({ latitude, longitude });
    };
    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert("선택 위치 없음!", "저장할 위치를 먼저 선택해주세요.");
            return;
        }
        navigation.navigate('AddPlace', {
            selectedLocation
        });
    }, [navigation, selectedLocation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({ tintColor }) => (
                <IconButton
                    icon="save"
                    size={24}
                    color={tintColor}
                    onPress={savePickedLocationHandler}
                />
            )
        })
    }, [navigation, savePickedLocationHandler]);
    return (
        <MapView
            style={styles.map}
            initialRegion={region}
            onPress={selectLocationHandler}
        >
            {
                selectedLocation &&
                <Marker title="선택된 위치" coordinate={selectedLocation} />
            }
        </MapView>
    )
}

export default Map;

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});