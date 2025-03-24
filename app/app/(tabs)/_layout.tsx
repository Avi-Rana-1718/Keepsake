import { Tabs } from "expo-router";
import { MaterialIcons, Ionicons } from "@expo/vector-icons"

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: "#007BFE",
            tabBarStyle: {
                backgroundColor: "#303030",
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                borderColor: "transparent"
            }
        }}>
            <Tabs.Screen name="index" options={{
                headerShown: false,
                title: "",
                tabBarIcon:({focused})=><MaterialIcons name="photo-library" color={focused?"#007BFE":"#888"} size={30} />
            }}/>
            <Tabs.Screen name="albums" options={{
                headerShown: false,
                title: "",
                tabBarIcon:({focused})=><Ionicons name="albums" color={focused?"#007BFE":"#888"} size={30} />
            }}/>
            <Tabs.Screen name="search" options={{
                headerShown: false,
                title: "",
                tabBarIcon: ({focused})=><Ionicons name="search" color={focused?"#007BFE":"#888"} size={30} />
            }}/>
        </Tabs>
    )
}