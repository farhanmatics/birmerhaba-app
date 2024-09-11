import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function RadioButton({ 
  options, 
  selectedOption, 
  onSelect 
}: {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}) {
  return (
    <View>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={styles.radioButton}
          onPress={() => onSelect(option)}
        >
          <View style={styles.radio}>
            {selectedOption === option && <View style={styles.radioDot} />}
          </View>
          <Text>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
});
