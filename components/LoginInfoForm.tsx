import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';


interface FormData {
  nickname: string;
  password: string;
  retypePassword: string;
  email: string;
  country: string;
  city: string;
  gender: string;
}

interface LoginInfoFormProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const countries = [
  { name: 'USA', code: 'usa' },
  { name: 'Canada', code: 'canada' },
  // Add more countries here
];

const cities = [
  { name: 'New York', code: 'new_york' },
  { name: 'Los Angeles', code: 'los_angeles' },
  // Add more cities here
];

const genders = [
  { name: 'Male', code: 'male' },
  { name: 'Female', code: 'female' },
  { name: 'Other', code: 'other' },
];

export default function LoginInfoForm({ formData, updateFormData }: LoginInfoFormProps) {
  const [isCountryModalVisible, setCountryModalVisible] = useState(false);
  const [isCityModalVisible, setCityModalVisible] = useState(false);
  const [isGenderModalVisible, setGenderModalVisible] = useState(false);

  const openModal = (setter: React.Dispatch<React.SetStateAction<boolean>>) => () => setter(true);
  const closeModal = (setter: React.Dispatch<React.SetStateAction<boolean>>) => () => setter(false);

  const selectItem = (key: keyof FormData, value: string) => {
    updateFormData({ [key]: value });
    closeModal(key === 'country' ? setCountryModalVisible : key === 'city' ? setCityModalVisible : setGenderModalVisible)();
  };

  const renderModal = (
    isVisible: boolean,
    onClose: () => void,
    title: string,
    data: { name: string; code: string }[],
    onSelect: (item: { name: string; code: string }) => void
  ) => (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => onSelect(item)}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>1. User Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Nickname"
        placeholderTextColor={'#e6c7e1'}
        value={formData.nickname}
        onChangeText={(text) => updateFormData({ nickname: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={'#e6c7e1'}
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => updateFormData({ password: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Retype Password"
        placeholderTextColor={'#e6c7e1'}
        secureTextEntry
        value={formData.retypePassword}
        onChangeText={(text) => updateFormData({ retypePassword: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={'#e6c7e1'}
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => updateFormData({ email: text })}
      />
      <TouchableOpacity style={styles.pickerButton} onPress={openModal(setCountryModalVisible)}>
        <Text style={{color: '#fff', flex: 1}}>{formData.country ? countries.find(c => c.code === formData.country)?.name : 'Select Country...'}</Text>
        <Entypo name="dots-two-horizontal" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.pickerButton} onPress={openModal(setCityModalVisible)}>
        <Text style={{color: '#fff', flex: 1}}>{formData.city ? cities.find(c => c.code === formData.city)?.name : 'Select City...'}</Text>
        <Entypo name="dots-two-horizontal" size={24} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.pickerButton} onPress={openModal(setGenderModalVisible)}>
        <Text style={{color: '#fff', flex: 1}}>{formData.gender ? genders.find(g => g.code === formData.gender)?.name : 'Select Gender...'}</Text>
        <Entypo name="dots-two-horizontal" size={24} color="#fff" />
      </TouchableOpacity>

      {renderModal(isCountryModalVisible, closeModal(setCountryModalVisible), 'Select Country', countries, (item) => selectItem('country', item.code))}
      {renderModal(isCityModalVisible, closeModal(setCityModalVisible), 'Select City', cities, (item) => selectItem('city', item.code))}
      {renderModal(isGenderModalVisible, closeModal(setGenderModalVisible), 'Select Gender', genders, (item) => selectItem('gender', item.code))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Merriweather',
    paddingBottom: 20,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
  },
});
