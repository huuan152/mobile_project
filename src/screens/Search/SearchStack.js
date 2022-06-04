import { createStackNavigator } from '@react-navigation/stack';
import Search from './index';
import BUTTON_COLORS from '../../Constants/Utilities/index';
import PostDetail from '../Post/SinglePostDetail';

const Stack = createStackNavigator();

const SearchStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 23
            },
            headerTintColor: BUTTON_COLORS.colorPicked,
            headerTitleAlign: 'center',
        }}>
            <Stack.Screen options={{headerShown: false}} name="Search" component={Search} />
            <Stack.Screen name="MyPostDetail_Search" component={PostDetail} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

export default SearchStack;