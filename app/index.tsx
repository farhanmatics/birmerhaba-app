import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { ArrowRight } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <ImageBackground source={require('../assets/images/love.png')} style={styles.background}>
      <BlurView intensity={2} style={styles.blurContainer}>
        <View style={styles.container}>
          <Text style={styles.text}>Welcome To</Text>
          <Text style={styles.boldText}>BIRMERHABA</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
            <ArrowRight color="white" size={24} />
          </TouchableOpacity>
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
    justifyContent: 'flex-end', // Aligns content to the bottom
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20, // Add some padding at the bottom
  },
  text: {
    color: 'white',
    fontFamily: 'Lato',
    fontSize: 20,
  },
  boldText: {
    color: 'white',
    fontFamily: 'Lato',
    fontSize: 40, // Increased font size
    fontWeight: 'bold', // Makes the text bold
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Semi-transparent background
    padding: 20,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 20,
    minWidth: 200,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Lato',
    fontSize: 22,
    marginRight: 30, // Space between text and arrow
  },
  arrow: {
    width: 20,
    height: 20,
  },
});
