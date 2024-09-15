import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '@/components/CustomButton';
import { User } from 'lucide-react-native';
import LottieView from 'lottie-react-native'; // Import LottieView
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useRouter } from 'expo-router';

const Login = () => {
  const navigation = useNavigation(); // Get the navigation object
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/LoggedHome')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      Alert.alert('Login Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#3f5efb', '#3b5998', '#9054bd', '#fc466b']}
      style={styles.container}
    >
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text><ChevronLeft size={40} color="#eeeeee" /></Text>
      </TouchableOpacity>
      <View style={styles.card}>
      <Text style={styles.title2}>Meet a Real Person</Text>
        <Text style={styles.title}>Sign in to continue</Text>
        <TextInput
          style={styles.input}
          placeholder="Email or nickname"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#fff"
        />
        <CustomButton
          title="Login"
          onPress={handleLogin}
          icon={<User size={24} color="white" />}
        />
        <Text style={styles.forgotPassword}>Forgot Password?</Text>

      </View>
      <View style={styles.lottieContainer}>
        <LottieView
          source={require('../assets/images/lovefly.json')} // Load your Lottie file
          autoPlay
          loop
          style={styles.lottie}
          speed={-1} // Reverse the animation
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Center the card horizontally
    padding: 16,
  },
  card: {
    width: '90%', // Adjust the width as needed
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#1a1818',
    shadowColor: '#fc466b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // Add elevation for Android shadow
    opacity: 0.6,
  },
  backButton: {
    position: 'absolute',
    top: 50, // Adjust the top position as needed
    left: 16, // Adjust the left position as needed
    zIndex: 1, // Ensure the button is above other elements
  },
  title: {
    fontSize: 13,
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Merriweather',
  },
  title2: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'MajorMonoDisplay',
    marginTop: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: '#fff',
    borderRadius: 10,
  },
  forgotPassword: {
    fontSize: 12,
    marginTop: 10,
    textAlign: 'left',
    marginLeft: 10,
    color: '#fff',
    fontFamily: 'Merriweather',
    textDecorationLine: 'underline',
  },
  lottieContainer: {
    position: 'absolute',
    bottom: 0, // Position at the bottom of the screen
    left: 0,
    right: 0,
    height: 200, // Adjust height as needed
    justifyContent: 'flex-end', // Align the animation to the bottom
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
});

export default Login;
