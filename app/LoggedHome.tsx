import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { auth } from './firebaseConfig';
import { getFirestore, doc, getDoc, DocumentData } from 'firebase/firestore';

const BlankScreen = () => {
  const [userDetails, setUserDetails] = useState<DocumentData | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const db = getFirestore();
        const userDocRef = doc(db, 'user-details', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserDetails(userDocSnap.data());
        }
      }
    };

    fetchUserDetails();
  }, []);


  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splash.png')}
        style={styles.splashImage}
      />
      <View style={styles.card}>
        <Text style={styles.welcomeText}>Welcome</Text>
      </View>
      <View style={styles.card}>
        {userDetails && (
            <>
              <Text>{userDetails.firstname} {userDetails.lastname}, {userDetails.gender}</Text>
              <Text>Nickname: {userDetails.nickname}</Text>
              <Text>Date of Birth: {userDetails.dateofbirth}</Text>
              <Text>Marital Status: {userDetails.marital}</Text>
              <Text>Education: {userDetails.education}</Text>
              <Text>Nationality: {userDetails.nationality}</Text>
              <Text>City: {userDetails.city}</Text>
              <Text>Country: {userDetails.country}</Text>
            </>
          )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#ffffff', // Set to white or any color you prefer
  },
  card: {
    width: '80%', // Adjust the width as needed
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'lightgray', // Card background color
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // Add elevation for Android shadow
    alignItems: 'center', // Center text inside the card
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  splashImage: {
    width: 200, // Adjust as needed
    height: 200, // Adjust as needed
    marginBottom: 20,
  },
});

export default BlankScreen;
