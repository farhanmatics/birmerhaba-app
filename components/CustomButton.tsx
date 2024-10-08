import React, { ReactNode } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  icon?: ReactNode;
  disabled?: boolean; // Add this line
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, icon }) => {
  return (
    <View style={styles.shadowContainer}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.contentContainer}>
          <Text style={styles.buttonText}>{title}</Text>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    borderRadius: 10,
    shadowColor: "#e1e1e1",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.10,
    shadowRadius: 4.65,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginHorizontal: 2,
    marginVertical: 10,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Lato',
    marginRight: 10,
  },
  iconContainer: {
    marginLeft: 10,
  },
});

export default CustomButton;