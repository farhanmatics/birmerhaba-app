import React from 'react';
import { ImageBackground, StyleSheet, View, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { ArrowRight } from 'lucide-react-native';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/start');
  };

  return (
    <ImageBackground source={require('../assets/images/love.png')} style={styles.background}>
      <BlurView intensity={2} style={styles.blurContainer}>
        <View style={styles.container}>
          <Text style={styles.text}>Welcome To</Text>
          <Text style={styles.boldText}>BIRMERHABA</Text>
          <CustomButton 
            title="Get Started"
            onPress={handleGetStarted}
            icon={<ArrowRight color="white" size={24} />}
          />
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
    marginBottom: 20,
  },
});
