import { createStackNavigator } from "@react-navigation/stack";
import Favorite from "./index";
import BUTTON_COLORS from "../../Constants/Utilities/index";
import PostDetail from "../Post/SinglePostDetail";
import { Text } from "react-native";

const Stack = createStackNavigator();

const FavoriteStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: "Yêu thích",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 23,
        },
        headerTintColor: BUTTON_COLORS.colorPicked,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Favorite"
        component={Favorite}
        options={({ navigation }) => ({
          headerLeft: () => <Text></Text>,
          headerRight: () => <Text></Text>,
        })}
      />
      <Stack.Screen
        name="MyPostDetail"
        component={PostDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default FavoriteStack;
