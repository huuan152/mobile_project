import { createStackNavigator } from '@react-navigation/stack';
import ListPost from './ListPost';
import PostDetail from './SinglePostDetail';

const Stack = createStackNavigator();

const PostScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="List Post" component={ListPost} />
            <Stack.Screen options={{headerShown: false}} name="Post" component={PostDetail} initialParams={{prev: 'List Post'}}/>
        </Stack.Navigator>
    );
}

export default PostScreen;