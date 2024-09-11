import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';
import { Heart, User } from 'lucide-react-native';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Start() {
  const router = useRouter();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 10000,
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
        
        <Text style={styles.label}>Find Your Perfect Match</Text>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Become a Member"
            onPress={() => console.log('Become a Member')}
            icon={<Heart size={24} color="white" />}
          />
          <Text style={styles.smallLabel}>Already a Member?</Text>
          <CustomButton
            title="Sign in here"
            onPress={() => console.log('Log In pressed')}
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
  },
  label: {
    color: 'white',
    fontSize: 22,
    marginBottom: 20,
    fontFamily: 'MajorMonoDisplay',
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
});
