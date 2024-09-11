import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import CustomButton from '@/components/CustomButton';
import LoginInfoForm from '@/components/LoginInfoForm';
import PersonalInfoForm from '@/components/PersonalInfoForm';

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
  });

  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
    } else {
      // Here you would typically validate the form and submit data
      router.push({
        pathname: '/Confirmation',
        params: formData,
      });
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
            <LoginInfoForm formData={formData} updateFormData={updateFormData} />
          ) : (
            <PersonalInfoForm 
              formData={formData} 
              updateFormData={updateFormData} 
              onBack={handleBack}
            />
          )}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <CustomButton
            title={step === 1 ? "Continue" : "Submit"}
            onPress={handleContinue}
          />
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
});
