import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons'

function IconButton({ icon, size, color, onPress }) {
    return (
        <Pressable
            style={({ pressed }) => { [styles.button, pressed && styles.preseed] }}
            onPress={onPress}
        >
            <Ionicons name={icon} size={size} color={color} />
        </Pressable>
    );
};

export default IconButton;

const styles = StyleSheet.create({
    button: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    preseed: {
        opacity: 0.7
    }
});