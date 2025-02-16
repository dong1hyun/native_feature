import { Alert, Image, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { getCurrentPositionAsync, PermissionStatus, useForegroundPermissions } from "expo-location";
import { useState } from "react";
import getMapPreview from "../../util/location";
import { useNavigation } from "@react-navigation/native";

function LocationPicker() {
    const navigation = useNavigation();
    const [pickedLocation, setPickedLocation] = useState();
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
    async function verifyPermissions() {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted
        }

        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('실패', '위치에 대한 권한이 필요합니다.');
            return false;
        }

        return true;
    };
    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();
        if(!hasPermission) return;

        const location = await getCurrentPositionAsync();
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        });
    };
    function pickOnMapHandler() {
        navigation.navigate('Map');
        console.log(navigation.getState())
    }
    return (
        <View>
            <View style={styles.mapPreview}>
                {
                    pickedLocation ?
                    <Image style={styles.image} source={{uri: getMapPreview(pickedLocation)}} /> :
                    <Text>선택된 위치가 없어요.</Text>
                    }
            </View>
            <View style={styles.actions}>
                <OutlinedButton icon="location" onPress={getLocationHandler}>
                    위치 찾기
                </OutlinedButton>
                <OutlinedButton icon="map" onPress={pickOnMapHandler}>
                    지도에서 선택
                </OutlinedButton>
            </View>
        </View>
    )
};

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    actions: {
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    }
});