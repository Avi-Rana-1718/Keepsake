import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    label: String,
    onPress?: ()=>void
}

export default function Button({label, onPress}:Props) {
    return (
            <Pressable
                onPress={onPress}
            >
                <Text style={styles.text}>{label}</Text>
            </Pressable>
    )
}


let styles = StyleSheet.create({
    text: {
        color: "#000",
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: 300,
        textAlign: "center",
        borderRadius: 5

    }
})