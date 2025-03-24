import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import * as SecureStore from "expo-secure-store"
import { useRouter } from "expo-router";

export default function AuthPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLogin, setIsLogin] = useState(true);

    return (
        <View style={styles.main}>
            <Text style={styles.heading}>{isLogin?"Login to your account":"Create a new account"}</Text>
            <View>
                <Text style={styles.label}>Email</Text>
                <TextInput 
                  style={styles.input}
                  value={email}
                  placeholder="Enter email"
                  onChangeText={(text)=>setEmail(text)}
                  />
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  placeholder="Enter password"
                  onChangeText={(text)=>setPassword(text)}
                  />
            </View>
            <Button label={isLogin?"Login":"Sign up"} onPress={()=>{
              
              fetch(`https://nook.avirana.com/auth/${isLogin?"login":"create"}`, {
                method: "POST",
                headers: {
                  "content-type": "application/json"
                },
                body: JSON.stringify({
                  email: email,
                  password: password
                })
              }).then(res=>res.json()).then(data=>{
                console.log(data);
              })

            }}/>
            <Text onPress={()=>{setIsLogin(!isLogin)}}>{isLogin?"New!? Create a account":"Login into an existing account"}</Text>
        </View>
    )
}

let styles = StyleSheet.create({
    text: {
        color: "white",
        fontFamily: "OpenSans"
    },
    heading: {
        fontSize: 20,
        paddingLeft: 8,
        marginBottom: 20,
        fontWeight: 600
    },
    main: {
      padding: 10
    },
    label: {
      marginLeft: 10
    },
    input: {
      borderColor: "#E8E8E8",
      borderWidth: 2,
      paddingHorizontal: 5,
      paddingVertical: 7,
      margin: 10,
      marginTop: 4,
      borderRadius: 3,
      backgroundColor: "#EAEAEA",

    }
})