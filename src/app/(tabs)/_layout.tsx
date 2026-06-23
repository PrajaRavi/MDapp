import { Tabs } from 'expo-router'
import { View, Text } from 'react-native'
import CustomTabBar from '../components/CustomTabBar'

const TabLayout = () => {
  return (
    <Tabs tabBar={(props:any)=><CustomTabBar {...props}/>} screenOptions={{
    headerShown: false,
    tabBarHideOnKeyboard: true,
  }}>
        <Tabs.Screen  name='Home' options={{title:"Home"}} />
        <Tabs.Screen name='Orders' options={{title:"order"}}/>
        <Tabs.Screen name='Profile' options={{title:"Profile"}}/>
    </Tabs>
      )
}

export default TabLayout