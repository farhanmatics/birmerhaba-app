import React, { ReactNode } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  icon?: ReactNode;
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
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    padding: 20,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginHorizontal: 10,
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