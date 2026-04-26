import { View, Text, StyleSheet } from "react-native";


function FilterScreen() {
  return (
    <View style={styles.container}>
        <Text>Filter Screen</Text>
    </View>
  );
}

const styles =  StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FilterScreen;