import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { auth } from './firebaseConfig';
import { getFirestore, doc, getDoc, DocumentData } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton'; // Import CustomButton
import { ArrowRight } from 'lucide-react-native';

const LoggedHome = () => {
  const [userDetails, setUserDetails] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/start');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splash.png')}
        style={styles.splashImage}
      />
      {userDetails && (
        <>
          <LinearGradient
            colors={['#3f5efb', '#3b5998', '#192f6a']}
            style={styles.card}
          >
            <Image
              source={require('../assets/images/userpic.jpg')}
              style={styles.userPic}
            />
            <Text style={styles.userName}>{userDetails.firstname} {userDetails.lastname}</Text>
            <Text style={styles.userInfo}>{userDetails.gender} • {userDetails.city}, {userDetails.country}</Text>
            <View style={styles.detailsContainer}>
              <DetailItem label="Nickname" value={userDetails.nickname} />
              <DetailItem label="Date of Birth" value={userDetails.dateofbirth} />
              <DetailItem label="Marital Status" value={userDetails.marital} />
              <DetailItem label="Education" value={userDetails.education} />
              <DetailItem label="Nationality" value={userDetails.nationality} />
            </View>
          </LinearGradient>
          <CustomButton 
            title="Logout"
            onPress={handleLogout}
            icon={<ArrowRight color="white" size={24} />}
          />
        </>
      )}
    </View>
  );
};

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>{label}:</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#000', // Set to white or any color you prefer
  },
  card: {
    width: '90%',
    padding: 20,
    borderRadius: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    alignItems: 'center',
    opacity: 0.6,
    borderTopWidth: 6,
    borderTopColor: '#fff',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  splashImage: {
    width: 140, // Adjust as needed
    height: 140, // Adjust as needed
    marginBottom: 10,
  },
  userPic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  userInfo: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 20,
  },
  detailsContainer: {
    width: '100%',
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: '#bbb',
  },
  detailValue: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
});

export default LoggedHome;
