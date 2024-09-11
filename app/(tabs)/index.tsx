import { ImageBackground, StyleSheet, View, Text } from 'react-native';
import { BlurView } from 'expo-blur';

export default function HomeScreen() {
  return (
    <ImageBackground source={require('../../assets/images/red.jpg')} style={styles.background}>
      <BlurView intensity={70} style={styles.blurContainer}>
        <View style={styles.container}>
          <Text style={styles.text}>just red</Text>
        </View>
      </BlurView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  blurContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontFamily: 'Lato',
    fontSize: 20,
  },
});
