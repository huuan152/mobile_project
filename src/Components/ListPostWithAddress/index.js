import { View, Text, StyleSheet } from "react-native";

import CustomListPost from "../ListPost";
const ListPostWithAddress = ({ data, title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <CustomListPost data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  title: {
    marginLeft: 12,
    color: "#3d6c8f",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ListPostWithAddress;
