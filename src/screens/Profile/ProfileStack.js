import { createStackNavigator } from '@react-navigation/stack';
import Profile from './index';
import AreaTrackingScreen from './AreaTracking/AreaTrackingScreen';
import MyPostScreen from './MyPost/MyPostScreen';
import BUTTON_COLORS from '../../Constants/Utilities/index';
import AddPostStack from '../AddPost/AddPostStack';
const Stack = createStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 23
            },
            headerTintColor: BUTTON_COLORS.colorPicked,
            headerTitleAlign: 'center',
        }}>
            <Stack.Screen options={{headerShown: false}} name="Profile" component={Profile} />
            <Stack.Screen name="MyPostScreen" component={MyPostScreen} options={{title: 'Phòng đã đăng'}} />
            <Stack.Screen name="AreaTrackingScreen" component={AreaTrackingScreen} options={{title: 'Theo dõi khu vực'}}/>
            <Stack.Screen name="UpdatePostStack" component={AddPostStack} options={{headerShown: false}} />
        </Stack.Navigator>
    );
}

export default ProfileStack;