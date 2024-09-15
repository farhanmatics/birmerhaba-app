import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { TextStyle } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRef, useEffect } from 'react';

const GradientText = ({ style, children, ...props }: { style?: TextStyle; children: React.ReactNode }) => (
  <MaskedView
    maskElement={<Text style={[style, { backgroundColor: 'transparent' }]} {...props}>{children}</Text>}
  >
    <LinearGradient
      colors={['#0aff00', '#00ff80', '#00ffff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <Text style={[style, { opacity: 0 }]} {...props}>{children}</Text>
    </LinearGradient>
  </MaskedView>
);

export default function Confirmation() {
  const params = useLocalSearchParams();
  const animation = useRef<LottieView>(null);

  useEffect(() => {
    animation.current?.play();
  }, []);

  return (
    <LinearGradient
      colors={['#3f5efb', '#3b5998', '#fc466b']}
      style={styles.container}
    >
      <View style={styles.card}>
        <LottieView
          ref={animation}
          source={require('../assets/images/lovesuccess.json')}
          style={styles.lottieAnimation}
          autoPlay={true}
          loop={true}
          speed={0.4}
        />
        <GradientText style={styles.congratsText}>Congratulations!</GradientText>
        <Text style={styles.title2}>Your Membership registration has been created!</Text>
        <Text style={styles.text}>Please check your email to complete your BIRMERHABA registration</Text>
        <Text style={[styles.text, {marginTop: 4}]}>In order to sign in into the site, activate your membership by clicking on the 'Membership Confirmation' link sent to your e-mail address</Text>
        
        
        {/* <Text style={styles.subtitle}>Personal Information:</Text>
        <Text style={styles.text}>First Name: {params.firstName}</Text>
        <Text style={styles.text}>Last Name: {params.lastName}</Text>
        <Text style={styles.text}>Date of Birth: {params.dateOfBirth}</Text>
        <Text style={styles.text}>Marital Status: {params.maritalStatus}</Text>
        <Text style={styles.text}>Nationality: {params.nationality}</Text>
        <Text style={styles.text}>Education Level: {params.educationLevel}</Text> */}
        
        <Link href="/" asChild>
          <TouchableOpacity style={styles.homeButton}>
            <Text style={styles.homeButtonText}>Go Home</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    alignSelf: 'center',
    margin: 10,
    padding: 20,
    backgroundColor: 'black',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0aff00',
  },
  title2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: 'white',
  },
  text: {
    color: 'white',
    marginBottom: 5,
  },
  homeButton: {
    backgroundColor: '#fc466b',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
    borderColor: '#fff',
    borderWidth: 1,
  },
  homeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  congratsText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  lottieAnimation: {
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
});
