import { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import * as MediaLibrary from "expo-media-library"

type Props = {
    album: any
}

export default function AlbumEntry({album}:Props) {
     const [assets, setAssets] = useState<any>([]);

    useEffect(()=>{
        async function getAlbumData() {
            try {
            const albumAssets = await MediaLibrary.getAssetsAsync({album: album});
            setAssets(albumAssets.assets)
            console.log(albumAssets.assets);

            } catch(err) {
                console.log(err);
                
            }
            
        }
        getAlbumData();
    }, [album])

    return (
        <View key={album.id}>
            <Text style={styles.text}>
                {album.title} - {album.assetCount} assets
            </Text>
            <View>
                {assets && assets.map((asset:any)=>(
                 <Image source={{ uri: asset.uri }} width={500} height={500} />
                 ))}
            </View>
        </View>
    )
}

let styles = StyleSheet.create({
    text: {
        color: "#ffffff"
    }
})