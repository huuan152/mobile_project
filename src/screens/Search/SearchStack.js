import { createStackNavigator } from "@react-navigation/stack";
import Search from "./index";
import BUTTON_COLORS from "../../Constants/Utilities/index";
import PostDetail from "../Post/SinglePostDetail";
import { Text } from "react-native";

const Stack = createStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        title: "Tìm kiếm",
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
        name="Search"
        component={Search}
      />
      <Stack.Screen
        name="MyPostDetail_Search"
        component={PostDetail}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;
