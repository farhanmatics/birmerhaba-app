import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';
import { Heart, User } from 'lucide-react-native';
import { Link } from 'expo-router';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

export default function Start() {
  const router = useRouter();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, 0],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.gradientContainer, { transform: [{ translateX }] }]}>
        <LinearGradient
          colors={['#3f5efb', '#3b5998', '#9054bd', '#fc466b']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
      </Animated.View>
      <View style={styles.content}>
        <LottieView
          source={require('../assets/images/lovefly.json')}
          style={styles.lottieAnimation}
          autoPlay
          loop
        />
        <Text style={styles.label2}>The Best Way to Meet New People is to say HELLO</Text>
        <View style={styles.glowingTextContainer}>
          <Text style={[styles.label, styles.glowingShadow]}>Find Your Perfect Match</Text>
          <Text style={[styles.label, styles.glowingShadow]}>Find Your Perfect Match</Text>
          <Text style={[styles.label, styles.glowingShadow]}>Find Your Perfect Match</Text>
          <Text style={styles.label}>Find Your Perfect Match</Text>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Become a Member"
            onPress={() => router.push('/Register')}
            icon={<Heart size={24} color="white" />}
          />
          <Text style={styles.smallLabel}>Already a Member?</Text>
          <CustomButton
            title="Sign in here"
            onPress={() => router.push('/Login')} // Update this line to route to the Login screen
            icon={<User size={24} color="white" />}
          />
        </View>
        <Link href="/" style={styles.smallLink}>Go Back</Link>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  gradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient: {
    flex: 1,
    width: width * 2,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50, // Adjust this value to control where the animation stops
  },
  glowingTextContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Lato',
    textAlign: 'center',
  },
  glowingShadow: {
    position: 'absolute',
    textShadowColor: 'rgba(255, 255, 255, 0.75)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 1,
  },
  label2: {
    color: 'white',
    fontSize: 18,
    padding: 30,
    marginTop: 40, // Adjust this value to control the space between the animation and text
    fontFamily: 'MajorMonoDisplay',
    textAlign: 'center',
  },
  lottieAnimation: {
    width: '100%',
    height: 200, // Adjust this value to control the height of the animation
    position: 'absolute',
    top: 0,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  smallLabel: {
    color: 'white',
    fontSize: 16,
    marginBottom: 0,
    paddingLeft: 20,
    paddingTop: 10,
    fontFamily: 'Merriweather',
  },
  smallLink: {
    color: 'white',
    fontSize: 16,
    marginBottom: 0,
    fontFamily: 'Merriweather',
  },
  textOverlayContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
