import { launchCameraAsync, PermissionStatus, useCameraPermissions } from "expo-image-picker";
import { useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../../UI/OutlinedButton";

function ImagePicker({onTakeImage}) {
    const [pickedImage, setPickedImage] = useState();
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
    async function verifyPermissions() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted
        }

        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('실패', '카메라에 대한 권한이 필요합니다.');
            return false;
        }

        return true;
    }
    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();
        
        if (!hasPermission) return;
        const result = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });

        const image = result.assets[0].uri;
        setPickedImage(image);
        onTakeImage(image);
    };

    return (
        <View>
            <View style={styles.imagePreview}>
                {
                    pickedImage ? <Image style={styles.image} source={{ uri: pickedImage }} /> :
                        <Text>선택된 이미지가 없어요.</Text>
                }
            </View>
            <OutlinedButton icon="camera" onPress={takeImageHandler}>이미지 가져오기</OutlinedButton>
        </View>
    )
};

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    image: {
        width: '100%',
        height: '100%',
    }
});