import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../../UI/Button";
import { Place } from "../../models/place";

function PlaceForm({onCreatePlace}) {
    const [title, setTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const [pickedLocation, setPickedLocation] = useState();

    function changeTitleHandler(text) {
        setTitle(text);
    };
    function takeImageHandler(imageUri) {
        setSelectedImage(imageUri);
    };
    const pickLocationHandler = useCallback((location) => {
        setPickedLocation(location)
    }, []);
    function savePlaceHandler() {
        const placeData = new Place(
            title, 
            selectedImage, 
            pickedLocation
        );
        onCreatePlace(placeData);
    };
    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>제목</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={changeTitleHandler}
                    value={title}
                />
            </View>
            <ImagePicker onTakeImage={takeImageHandler} />
            <LocationPicker onPickLocation={pickLocationHandler} />
            <Button onPress={savePlaceHandler}>장소 저장</Button>
        </ScrollView>
    )
}

export default PlaceForm;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24,
        marginBottom: 8
    },
    label: {
        fontWeight: 'bold',
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100
    },
});