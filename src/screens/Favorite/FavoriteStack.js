import { createStackNavigator } from '@react-navigation/stack';
import Favorite from './index';
import BUTTON_COLORS from '../../Constants/Utilities/index';
import PostDetail from '../Post/SinglePostDetail';

const Stack = createStackNavigator();

const FavoriteStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 23
            },
            headerTintColor: BUTTON_COLORS.colorPicked,
            headerTitleAlign: 'center',
        }}>
            <Stack.Screen options={{headerShown: false}} name="Favorite" component={Favorite} />
            <Stack.Screen name="MyPostDetail" component={PostDetail} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

export default FavoriteStack;