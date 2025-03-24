import { Link } from "expo-router";
import { Text, View, StyleSheet, Image } from "react-native";
import Button from "@/components/Button";
import * as MediaLibrary from "expo-media-library"
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import PhotoItem from "@/components/PhotoItem";

export default function Index() {

  let photos = ["https://picsum.photos/seed/696/3000/2000", "https://picsum.photos/seed/696/3000/2000"];

  return (
    <View style={styles.main}>
      {/* NAV BAR */}
      <View style={styles.navBar}>
        <Text style={[styles.text, styles.heading]}>Library</Text>
        <View style={styles.flex}>
          <Text style={styles.text}>
            <Link href={"/notifications"}><Ionicons name="notifications" style={{marginRight: 10}} size={20} /></Link>
          </Text>
          <Text style={styles.text}>Avi Rana</Text>
        </View>
      </View>
      {/* NAV BAR */}

      {/* PHOTO LIST */}
      {photos.map((el)=>(
        <PhotoItem img={el} />
      ))}


    </View>
  );
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

  // const [albums, setAlbums] = useState<any>(null);
  // const [permissionResponse, requestPermission] = MediaLibrary.usePermissions()

  // async function getAlbums() {
  //   if(permissionResponse?.status !== "granted") {
  //     requestPermission();
  //   }
  //   const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
  //     includeSmartAlbums: true
  //   })    
  //   setAlbums(fetchedAlbums)
  // }