import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Confirmation() {
  const params = useLocalSearchParams();

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <View style={styles.card}>
        <ScrollView>
          <Text style={styles.title}>Registration Confirmation</Text>
          <Text style={styles.subtitle}>Login Information:</Text>
          <Text>Nickname: {params.nickname}</Text>
          <Text>Email: {params.email}</Text>
          <Text>Country: {params.country}</Text>
          <Text>City: {params.city}</Text>
          <Text>Gender: {params.gender}</Text>
          
          <Text style={styles.subtitle}>Personal Information:</Text>
          <Text>First Name: {params.firstName}</Text>
          <Text>Last Name: {params.lastName}</Text>
          <Text>Date of Birth: {params.dateOfBirth}</Text>
          <Text>Marital Status: {params.maritalStatus}</Text>
          <Text>Nationality: {params.nationality}</Text>
          <Text>Education Level: {params.educationLevel}</Text>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flex: 1,
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
});
