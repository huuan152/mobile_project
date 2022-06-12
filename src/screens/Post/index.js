import { createStackNavigator } from "@react-navigation/stack";
import ListPost from "./ListPost";
import PostDetail from "./SinglePostDetail";
import BUTTON_COLORS from "../../Constants/Utilities/index";
import { Text } from "react-native";

const Stack = createStackNavigator();

const PostScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: "Trang chủ",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 23,
        },
        headerTintColor: BUTTON_COLORS.colorPicked,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        options={({ navigation }) => ({
          headerLeft: () => <Text></Text>,
          headerRight: () => <Text></Text>,
        })}
        name="List Post"
        component={ListPost}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Post"
        component={PostDetail}
        initialParams={{ prev: "List Post" }}
      />
    </Stack.Navigator>
  );
};

export default PostScreen;
