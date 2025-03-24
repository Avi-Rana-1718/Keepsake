import { Image} from "expo-image";
import { StyleSheet, View } from "react-native";

interface Props {
    img: any
}

export default function PhotoItem({img}:Props) {
    return (
        <View style={styles.container}>
            <Image 
                style={styles.image}
                source={img}
                contentFit="cover"
            />
        </View>
    )
}

let styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1
      },
    image: {
        width: "100%",
        flex: 1
    }
})