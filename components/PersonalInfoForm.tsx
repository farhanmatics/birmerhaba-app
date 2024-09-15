import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons if not already installed

interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  maritalStatus: string;
  nationality: string;
  educationLevel: string;
  error?: string; // Add this line to include the error property
}
  
interface PersonalInfoFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onBack: () => void; // Add this new prop
}

export default function PersonalInfoForm({ formData, updateFormData, onBack }: PersonalInfoFormProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState('');

  const openModal = (field: string) => {
    setCurrentField(field);
    setModalVisible(true);
  };

  const selectOption = (option: string) => {
    updateFormData({ [currentField]: option });
    setModalVisible(false);
  };

  const renderOptions = () => {
    const options: Record<string, string[]> = {
      maritalStatus: ['Single', 'Married', 'Divorced', 'Widowed'],
      nationality: ['American', 'Canadian', /* Add more nationalities */],
      educationLevel: ['High School', "Bachelor's Degree", "Master's Degree", 'PhD'],
    };

    const currentOptions = options[currentField] || [];

    return currentOptions.map((option) => (
      <TouchableOpacity key={option} onPress={() => selectOption(option)} style={styles.modalOption}>
        <Text>{option}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>2. Personal Information</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor="#e6c7e1"
        value={formData.firstName}
        onChangeText={(text) => updateFormData({ firstName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor="#e6c7e1"
        value={formData.lastName}
        onChangeText={(text) => updateFormData({ lastName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        placeholderTextColor="#e6c7e1"
        value={formData.dateOfBirth}
        onChangeText={(text) => updateFormData({ dateOfBirth: text })}
      />
      <TouchableOpacity onPress={() => openModal('maritalStatus')} style={styles.pickerButton}>
        <Text style={{color: '#fff', flex: 1}}>{formData.maritalStatus || 'Select Marital Status'}</Text>
        <Entypo name="dots-two-horizontal" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => openModal('nationality')} style={styles.pickerButton}>
        <Text style={{color: '#fff', flex: 1}}>{formData.nationality || 'Select Nationality'}</Text>
        <Entypo name="dots-two-horizontal" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => openModal('educationLevel')} style={styles.pickerButton}>
        <Text style={{color: '#fff', flex: 1}}>{formData.educationLevel || 'Select Education Level'}</Text>
        <Entypo name="dots-two-horizontal" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.infoText}>
        NOTE:*Birmerhaba uses the Official Approved Membership Model. Please enter your real information in the field below. You can change the information in this field until your membership is approved. We do not share your name, surname, birth date and month with anyone.
      </Text>

      {formData.error && (
        <Text style={styles.errorText}>
          {formData.error}
        </Text>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{`Select ${currentField}`}</Text>
            {renderOptions()}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    marginRight: 10,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Merriweather',
  },
  input: {
    height: 40,
    borderColor: '#fc466b',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#000',
    fontFamily: 'Merriweather',
    fontSize: 16,
    color: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 10,
  },
  pickerButton: {
    height: 40,
    borderColor: '#fc466b',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: '#000',
    color: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    color: '#fff',
    fontFamily: 'Merriweather',
    fontSize: 11,
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  errorText: {
    color: '#fc466b', // or any color you prefer for error messages
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
});
