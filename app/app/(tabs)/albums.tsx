import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font"

export default function AlbumsPage() {

      useEffect(()=>{
        async function loadFont() {
          await Font.loadAsync({
            "OpenSans": require("../../assets/fonts/OpenSans.ttf")
          })
        }
        loadFont();
      }, [])

    return (
    <View style={styles.main}>
      {/* NAV BAR */}
      <View style={styles.navBar}>
        <Text style={[styles.text, styles.heading]}>Albums</Text>
            <View style={styles.flex}>

                <Text style={styles.text}>A</Text>
            </View>
      </View>
      {/* NAV BAR */}

      {/* ALBUM LIST */}
    </View>
    )
}

const styles = StyleSheet.create({
    main: {
      padding:20,
      paddingTop: 50,
      height: "100%",
      // backgroundColor: "#131314",
    },
    text: {
      // color: "#fff",
      // fontFamily: "OpenSans"
    },
    heading: {
      fontSize: 25,
      marginBottom: 10,
      fontWeight: 600
    },
    button: {
      fontSize: 20,
      textDecorationLine: "underline",
      color: "#fff"
    },
    image: {
      width: 320,
      height: 440,
      borderRadius: 20
    },
    flex: {
      flexDirection: "row"
    },
    navBar: {
      flexDirection: "row",
      justifyContent: "space-between"
    }
})