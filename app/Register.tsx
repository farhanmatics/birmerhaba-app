import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import CustomButton from '@/components/CustomButton';
import LoginInfoForm from '@/components/LoginInfoForm';
import PersonalInfoForm from '@/components/PersonalInfoForm';
import { db, auth } from './firebaseConfig'; // Adjust the path as necessary
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore'; // Import Firestore
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Import Auth
import LottieView from 'lottie-react-native'; // Add this line

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nickname: '',
    password: '',
    retypePassword: '',
    email: '',
    country: '',
    city: '',
    gender: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    maritalStatus: '',
    nationality: '',
    educationLevel: '',
    acceptMembership: false, // Add this line
    acceptPersonalData: false, // Add this line
  });
  const [loading, setLoading] = useState(false); // Add this line

  const handleContinue = async () => {
    if (step === 1) {
      setStep(2);
    } else {
      setLoading(true); // Add this line to set loading state
      try {
        const auth = getAuth();
        const db = getFirestore();
        
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;
        
        // Store user details in Firestore using the user's UID
        await setDoc(doc(db, 'user-details', user.uid), {
          city: formData.city,
          country: formData.country,
          dateofbirth: formData.dateOfBirth,
          education: formData.educationLevel,
          firstname: formData.firstName,
          gender: formData.gender,
          lastname: formData.lastName,
          marital: formData.maritalStatus,
          nationality: formData.nationality,
          nickname: formData.nickname,
        });

        // Wait for 3 seconds before navigating
        await new Promise(resolve => setTimeout(resolve, 3000));

        router.push({
          pathname: '/Confirmation',
          params: {
            ...formData,
            acceptMembership: formData.acceptMembership.toString(), // Convert to string
            acceptPersonalData: formData.acceptPersonalData.toString(), // Convert to string
          },
        });
      } catch (error) {
        console.error("Error creating user or storing data: ", error);
        // Handle error (e.g., show a message to the user)
        setLoading(false);
      } finally {
        //setLoading(false); // Add this line to reset loading state
      }
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const updateFormData = (newData: Partial<typeof formData>) => {
    setFormData({ ...formData, ...newData });
  };

  return (
    <LinearGradient
      colors={['#3f5efb', '#9054bd', '#fc466b']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <MaskedView
            maskElement={
              <Text style={[styles.title, { backgroundColor: 'transparent' }]}>
                Become a Member
              </Text>
            }
          >
            <LinearGradient
              colors={['#3f5efb', '#f0f0f0', '#fc466b']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ flex: 1 }}
            >
              <Text style={[styles.title, { opacity: 0 }]}>Become a Member</Text>
            </LinearGradient>
          </MaskedView>
          
          {step === 1 ? (
            <LoginInfoForm 
              formData={formData} 
              updateFormData={updateFormData} 
              onContinue={handleContinue} // Add this line
            />
          ) : (
            <PersonalInfoForm 
              formData={formData} 
              updateFormData={updateFormData} 
              onBack={handleBack}
            />
          )}
        </ScrollView>
        <View style={styles.buttonContainer}>
          {loading ? ( // Add this condition
            <LottieView 
              source={require('../assets/images/lovesuccess.json')} 
              autoPlay 
              loop={false} 
              style={styles.lottie} // Add a style for the Lottie animation
            />
          ) : (
            <CustomButton
              title={step === 1 ? "Continue" : "Submit"} // Update title
              onPress={handleContinue} // Use handleContinue directly
            />
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1818',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Merriweather',
    color: '#333',
    marginTop: 60,
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: '#1f1e1e',
  },
  lottie: {
    width: 60, // Adjust width as needed
    height: 60, // Adjust height as needed
  },
});
