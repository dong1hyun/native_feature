import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

function PlaceForm() {
    const [title, setTitle] = useState('');

    function changeTitleHandler(text) {
        setTitle(text);
    }
    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={changeTitleHandler}
                    value={title}
                />
            </View>
            <ImagePicker />
            <LocationPicker />
        </ScrollView>
    )
}

export default PlaceForm;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
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