import { createStackNavigator } from '@react-navigation/stack';
import Profile from './index';
import AreaTrackingScreen from './AreaTracking/AreaTrackingScreen';

const Stack = createStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="Profile" component={Profile} />
            <Stack.Screen options={{headerShown: false}} name="AreaTrackingScreen" component={AreaTrackingScreen} />
        </Stack.Navigator>
    );
}

export default ProfileStack;