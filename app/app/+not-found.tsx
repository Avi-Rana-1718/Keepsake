import { Link, Stack } from "expo-router";
import { View, Text } from "react-native";

export default function NotFoundScreen() {
    return (
        <>
        <Stack.Screen options={{title: "noT found"}}/>
            <View>
                <Text>Not found</Text>
            </View>
            </>
    )
}