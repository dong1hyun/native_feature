import { launchCameraAsync, PermissionStatus, useCameraPermissions } from "expo-image-picker";
import { Alert, Button, View } from "react-native";

function ImagePicker() {
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
    async function verifyPermissions() {
        if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted
        }

        if(cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('실패', '카메라에 대한 권한이 필요합니다.');
            return false;
        }

        return true;
    }
    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();
        if(!hasPermission) return;
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5, 
        });
        console.log(image) 
    };
    return (
        <View>
            <View>

            </View>
            <Button title="이미지 가져오기" onPress={takeImageHandler} />
        </View>
    )
};

export default ImagePicker;